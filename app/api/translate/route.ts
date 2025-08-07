import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export async function POST(request: NextRequest) {
  try {
    const { sourceText, selectedLanguage } = await request.json();
    console.log("Request received:", { sourceText, selectedLanguage });

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    

    const prompt = `You will be provided with a sentence. This sentence: "${sourceText}". Your tasks are to:
          - Detect what language the sentence is in
          - Translate the sentence into ${selectedLanguage}
          Do not return anything other than the translated sentence.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const data = response.text();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error in translation", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
