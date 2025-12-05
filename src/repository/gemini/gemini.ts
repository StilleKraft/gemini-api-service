import { GoogleGenAI } from "@google/genai";

export async function generateGeminiResponse(
  prompt: string
): Promise<{ string: string; Error: Error | null }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return { string: "", Error: new Error("GEMINI_API_KEY is not defined") };
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });
    return { string: response.text || "", Error: null };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { string: "", Error: error as Error };
  }
}

export async function generateGeminiResponseFromMedia(
  prompt: string,
  base64Image: string,
  mimeType: string
): Promise<{ string: string; Error: Error | null }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return { string: "", Error: new Error("GEMINI_API_KEY is not defined") };
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
      ],
    });
    return { string: response.text || "", Error: null };
  } catch (error) {
    return { string: "", Error: error as Error };
  }
}

export async function generateGeminiResponseFromDocument(
  prompt: string,
  base64Image: string,
  mimeType: string
): Promise<{ string: string; Error: Error | null }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return { string: "", Error: new Error("GEMINI_API_KEY is not defined") };
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
      ],
    });
    return { string: response.text || "", Error: null };
  } catch (error) {
    return { string: "", Error: error as Error };
  }
}
