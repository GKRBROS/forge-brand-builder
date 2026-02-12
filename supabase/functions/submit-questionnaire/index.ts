import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FileData {
  name: string;
  base64: string;
  mimeType: string;
}

interface FormData {
  brandName: string;
  tagline: string;
  description: string;
  targetCustomers: string;
  logoType: string;
  colorPreference: string;
  fontStyle: string;
  additionalNotes: string;
  selectedUsage: string[];
  referenceFiles: FileData[];
}

async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  message: string
): Promise<void> {
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Telegram error response:", error);
    throw new Error(`Failed to send Telegram message: ${error}`);
  }
}

async function sendTelegramMediaGroup(
  botToken: string,
  chatId: string,
  photos: { url: string; name: string }[],
  brandName: string
): Promise<void> {
  if (photos.length === 0) return;

  // Build media array for sendMediaGroup
  const media = photos.map((photo, index) => ({
    type: "photo",
    media: photo.url,
    caption: index === 0
      ? `📷 <b>Reference Images (${photos.length})</b>\n🏷️ Brand: ${brandName}`
      : undefined,
    parse_mode: index === 0 ? "HTML" : undefined,
  }));

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        media: media,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Telegram media group error response:", error);
    console.warn(`Failed to send media group: ${error}`);
  }
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log("Form data received for brand:", formData.brandName);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      throw new Error("Missing Supabase environment variables");
    }

    if (!telegramBotToken || !telegramChatId) {
      console.error("Missing Telegram environment variables");
      throw new Error("Missing Telegram environment variables");
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upload files to storage and collect URLs
    const uploadedFiles: { name: string; url: string }[] = [];
    const timestamp = Date.now();
    const folderPath = `${formData.brandName.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}`;

    console.log("Uploading", formData.referenceFiles.length, "files to folder:", folderPath);

    for (const file of formData.referenceFiles) {
      try {
        // Convert base64 to Uint8Array
        const binaryString = atob(file.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const filePath = `${folderPath}/${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("logo-references")
          .upload(filePath, bytes, {
            contentType: file.mimeType,
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error for file:", file.name, uploadError);
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("logo-references")
          .getPublicUrl(filePath);

        uploadedFiles.push({
          name: file.name,
          url: urlData.publicUrl,
        });

        console.log("Uploaded file:", file.name);
      } catch (fileError) {
        console.error("Error uploading file:", file.name, fileError);
        throw new Error(`Failed to upload file ${file.name}: ${fileError}`);
      }
    }

    // Store submission in database
    console.log("Storing submission in database");
    const { data: submission, error: dbError } = await supabase
      .from("questionnaire_submissions")
      .insert({
        brand_name: formData.brandName,
        tagline: formData.tagline || null,
        description: formData.description,
        target_customers: formData.targetCustomers,
        logo_type: formData.logoType,
        color_preference: formData.colorPreference,
        font_style: formData.fontStyle,
        additional_notes: formData.additionalNotes || null,
        selected_usage: formData.selectedUsage,
        reference_files: uploadedFiles,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store submission: ${dbError.message}`);
    }

    console.log("Submission stored with ID:", submission.id);

    // Compose Telegram message with proper spacing
    const message = `🎨 <b>NEW LOGO DESIGN REQUEST</b>

━━━━━━━━━━━━━━━━━━━━

🏷️  <b>${formData.brandName.toUpperCase()}</b>
${formData.tagline ? `<i>"${formData.tagline}"</i>` : ""}

━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━

📝 <b>DESCRIPTION</b>

${formData.description}

━━━━━━━━━━━━━━━━━━━━

👥 <b>TARGET CUSTOMERS</b>

${formData.targetCustomers}

━━━━━━━━━━━━━━━━━━━━

🎯 <b>DESIGN PREFERENCES</b>

   <b>Logo Type:</b>  ${formData.logoType}
   <b>Color:</b>  ${formData.colorPreference}
   <b>Font Style:</b>  ${formData.fontStyle}
   <b>Usage:</b>  ${formData.selectedUsage.join(", ")}

━━━━━━━━━━━━━━━━━━━━

📎 <b>ADDITIONAL NOTES</b>

${formData.additionalNotes || "None provided"}

━━━━━━━━━━━━━━━━━━━━

📁 <b>REFERENCE FILES:</b>  ${uploadedFiles.length} file(s)
${uploadedFiles.map((f, i) => `   ${i + 1}. <a href="${f.url}">${f.name}</a>`).join("\n")}

━━━━━━━━━━━━━━━━━━━━

🆔 <b>Submission ID:</b>  ${submission.id}
📅 <b>Submitted:</b>  ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC`;

    // Send Telegram notification with URL preview enabled
    console.log("Sending Telegram text notification with URL preview");
    await sendTelegramMessage(telegramBotToken, telegramChatId, message);
    console.log("Telegram notification sent successfully with preview");

    return new Response(
      JSON.stringify({
        success: true,
        submissionId: submission.id,
        filesUploaded: uploadedFiles.length
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in submit-questionnaire:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);