import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CleanupResult {
  deletedFolders: string[];
  deletedFilesCount: number;
  status: string;
  error?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Cleanup task started");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: "Missing environment variables" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const BUCKET_NAME = "logo-references";
  const RETENTION_DAYS = 45;
  const now = Date.now();
  const thresholdTime = now - (RETENTION_DAYS * 24 * 60 * 60 * 1000);

  const result: CleanupResult = {
    deletedFolders: [],
    deletedFilesCount: 0,
    status: "success",
  };

  try {
    // List folders in the bucket root
    const { data: items, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list("", { limit: 1000 });

    if (listError) throw listError;

    if (!items || items.length === 0) {
      console.log("No items found in bucket");
    } else {
      for (const item of items) {
        // Folders follow pattern: brandName_timestamp
        const parts = item.name.split("_");
        const timestampStr = parts[parts.length - 1];
        const folderTimestamp = parseInt(timestampStr);

        // If it's a valid timestamp and older than threshold
        if (!isNaN(folderTimestamp) && folderTimestamp < thresholdTime) {
          console.log(`Identifying old folder: ${item.name} (timestamp: ${folderTimestamp})`);
          
          // List contents of this folder
          const { data: folderContents, error: folderError } = await supabase.storage
            .from(BUCKET_NAME)
            .list(item.name);
            
          if (folderError) {
            console.error(`Error listing folder ${item.name}:`, folderError);
            continue;
          }

          if (folderContents && folderContents.length > 0) {
            const filesToDelete = folderContents.map(f => `${item.name}/${f.name}`);
            const { error: deleteError } = await supabase.storage
              .from(BUCKET_NAME)
              .remove(filesToDelete);
              
            if (deleteError) {
              console.error(`Error deleting files in ${item.name}:`, deleteError);
            } else {
              result.deletedFilesCount += filesToDelete.length;
              result.deletedFolders.push(item.name);
              console.log(`Deleted ${filesToDelete.length} files in folder ${item.name}`);
            }
          } else {
            // Empty folder or single file at root
            const { error: deleteError } = await supabase.storage
              .from(BUCKET_NAME)
              .remove([item.name]);
              
            if (deleteError) {
              console.error(`Error deleting ${item.name}:`, deleteError);
            } else {
              result.deletedFilesCount += 1;
              result.deletedFolders.push(item.name);
              console.log(`Deleted root item ${item.name}`);
            }
          }
        }
      }
    }

    // Log the activity
    await supabase
      .from("cleanup_logs")
      .insert({
        deleted_folders_count: result.deletedFolders.length,
        deleted_files_count: result.deletedFilesCount,
        status: result.status,
        details: {
          deleted_folders: result.deletedFolders,
          threshold_date: new Date(thresholdTime).toISOString(),
        }
      });

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Cleanup error:", error);
    result.status = "error";
    result.error = error.message;

    // Log the error
    await supabase
      .from("cleanup_logs")
      .insert({
        deleted_folders_count: 0,
        deleted_files_count: 0,
        status: "error",
        details: { error: error.message }
      });

    return new Response(
      JSON.stringify(result),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
