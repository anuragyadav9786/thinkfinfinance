"use server";

import { z } from "zod";
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  date: z.date(),
  timeSlot1: z.string(),
  timeSlot2: z.string(),
});

type FormData = z.infer<typeof formSchema>;

async function appendToSheet(data: FormData) {
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
  
  const range = "Sheet1!A:H"; 

  const values = [
    [
      new Date().toISOString(),
      data.name,
      data.email,
      data.phone,
      data.date.toLocaleDateString("en-IN"), 
      data.timeSlot1,
      data.timeSlot2,
      data.message,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

export async function submitForm(data: FormData): Promise<{ success: boolean; message: string }> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }
  
  try {
    await appendToSheet(parsedData.data);
    return { success: true, message: "Form submitted successfully!" };
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    if (error instanceof Error && error.message.includes("credentials")) {
         return { success: false, message: "Server configuration error. Please contact the administrator." };
    }
    return { success: false, message: "Could not submit the form. Please try again later." };
  }
}
