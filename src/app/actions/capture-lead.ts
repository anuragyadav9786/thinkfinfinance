"use server";

import { z } from "zod";
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  goal: z.string(),
  source: z.string(),
});

type LeadData = z.infer<typeof leadSchema>;

// Reuses the same Google Sheets service account already configured for the
// site's contact form. Writes to a "Leads" tab so these rows don't collide
// with the differently-shaped columns the old contact form used — create a
// tab named "Leads" in the spreadsheet, or change the range below to match
// wherever these should land.
async function appendLeadToSheet(data: LeadData) {
  const { GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;

  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error("Google Sheets API credentials are not configured in environment variables.");
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = "Leads!A:E";

  const values = [[new Date().toISOString(), data.name, data.email, data.goal, data.source]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

export async function captureLead(data: LeadData): Promise<{ success: boolean; message: string }> {
  const parsed = leadSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    await appendLeadToSheet(parsed.data);
    return { success: true, message: "Lead captured." };
  } catch (error) {
    console.error("Error appending lead to Google Sheet:", error);
    return { success: false, message: "Could not save your details right now." };
  }
}
