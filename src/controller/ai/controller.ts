import { generateGeminiResponse } from "../../repository/gemini/gemini";

interface AiInterface {
  /**
   * The language model to use for text generation.
   * in case for add more LLM model, just add the model name here
   */
  LLModel: "gemini-ai";

  /**
   * Generate text using the Gemini API.
   * @param prompt - The prompt to send to the Gemini API.
   * @returns A promise that resolves to the generated text.
   * @throws An error if the Gemini API request fails.
   */
  GenerateText: (prompt: string) => Promise<string>;
}

export class AiController implements AiInterface {
  LLModel: "gemini-ai";

  constructor(LLModel: "gemini-ai") {
    this.LLModel = LLModel;
  }

  async GenerateText(prompt: string): Promise<string> {
    switch (this.LLModel) {
      case "gemini-ai":
        const { string, Error } = await generateGeminiResponse(prompt);
        if (Error) {
          console.error("Gemini API Error:", Error);
          throw Error;
        }
        return string;
      default:
        return "";
    }
  }
}
