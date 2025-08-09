import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { sourceText, selectedLanguage } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Translate the following text to ${selectedLanguage}. Only return the translated text, nothing else:

Text: "${sourceText}"
Translation:`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const data = response.text();
    return NextResponse.json({ data: data.trim() }, { status: 200 });
  } catch (error) {
    console.error("Error in translation:", error);
    if (error instanceof Error) {
      if (error.message?.includes("API_KEY_INVALID")) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your GEMINI_API_KEY" },
          { status: 401 }
        );
      }

      if (error.message?.includes("QUOTA_EXCEEDED")) {
        return NextResponse.json(
          { error: "API quota exceeded. Please try again later" },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: error.message || "Translation failed" },
        { status: 500 }
      );
    }
  }
}
