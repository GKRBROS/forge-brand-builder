import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  referenceFiles: { name: string; base64: string; mimeType: string }[];
}

async function uploadToGoogleDrive(
  accessToken: string,
  folderId: string,
  fileName: string,
  base64Content: string,
  mimeType: string
): Promise<{ id: string; webViewLink: string }> {
  // Create file metadata
  const metadata = {
    name: fileName,
    parents: [folderId],
  };

  // Convert base64 to blob
  const binaryContent = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0));

  // Create multipart body
  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataStr = JSON.stringify(metadata);
  
  // Build the multipart request
  const encoder = new TextEncoder();
  const metadataPart = encoder.encode(
    `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${metadataStr}`
  );
  const filePart = encoder.encode(
    `${delimiter}Content-Type: ${mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n`
  );
  const closeDelimiterBytes = encoder.encode(closeDelimiter);
  const base64Bytes = encoder.encode(base64Content);

  const body = new Uint8Array(
    metadataPart.length + filePart.length + base64Bytes.length + closeDelimiterBytes.length
  );
  body.set(metadataPart, 0);
  body.set(filePart, metadataPart.length);
  body.set(base64Bytes, metadataPart.length + filePart.length);
  body.set(closeDelimiterBytes, metadataPart.length + filePart.length + base64Bytes.length);

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload to Google Drive: ${error}`);
  }

  return response.json();
}

async function createGoogleDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<{ id: string; webViewLink: string }> {
  const metadata: Record<string, unknown> = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?fields=id,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create folder: ${error}`);
  }

  return response.json();
}

async function getGoogleAccessToken(serviceAccountKey: string): Promise<string> {
  const key = JSON.parse(serviceAccountKey);
  
  // Create JWT header
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  // Create JWT claim set
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  // Base64url encode
  const base64urlEncode = (obj: unknown) => {
    const str = JSON.stringify(obj);
    const base64 = btoa(str);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const encodedHeader = base64urlEncode(header);
  const encodedClaim = base64urlEncode(claim);
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  // Import the private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = key.private_key
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signatureInput)
  );

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const jwt = `${signatureInput}.${encodedSignature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
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
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send Telegram message: ${error}`);
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    
    const serviceAccountKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!serviceAccountKey || !telegramBotToken || !telegramChatId) {
      throw new Error("Missing required environment variables");
    }

    // Get Google Drive access token
    const accessToken = await getGoogleAccessToken(serviceAccountKey);

    // Create folder for this company
    const folderName = `${formData.brandName} - ${new Date().toISOString().split("T")[0]}`;
    const folder = await createGoogleDriveFolder(accessToken, folderName);

    // Upload all reference files to the folder
    const uploadedFiles: { name: string; link: string }[] = [];
    for (const file of formData.referenceFiles) {
      const uploaded = await uploadToGoogleDrive(
        accessToken,
        folder.id,
        file.name,
        file.base64,
        file.mimeType
      );
      uploadedFiles.push({ name: file.name, link: uploaded.webViewLink || `https://drive.google.com/file/d/${uploaded.id}/view` });
    }

    // Compose Telegram message
    const folderLink = folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`;
    
    const message = `
<b>🎨 New Logo Design Request</b>

<b>Brand Name:</b> ${formData.brandName}
<b>Tagline:</b> ${formData.tagline || "N/A"}

<b>Description:</b>
${formData.description}

<b>Target Customers:</b>
${formData.targetCustomers}

<b>Logo Type:</b> ${formData.logoType}
<b>Color Preference:</b> ${formData.colorPreference}
<b>Font Style:</b> ${formData.fontStyle}
<b>Usage:</b> ${formData.selectedUsage.join(", ")}

<b>Additional Notes:</b>
${formData.additionalNotes || "None"}

<b>📁 Reference Files Folder:</b>
<a href="${folderLink}">${folderLink}</a>

<b>Files Uploaded:</b> ${uploadedFiles.length}
${uploadedFiles.map(f => `• ${f.name}`).join("\n")}
`;

    // Send Telegram notification
    await sendTelegramMessage(telegramBotToken, telegramChatId, message);

    return new Response(
      JSON.stringify({ 
        success: true, 
        folderLink,
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
