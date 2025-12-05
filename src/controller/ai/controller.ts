import {
  generateGeminiResponse,
  generateGeminiResponseFromMedia,
} from "../../repository/gemini/gemini";

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

  /**
   * Generate text using the Gemini API from an image.
   * @param prompt - The prompt to send to the Gemini API.
   * @param base64Image - The base64-encoded image to send to the Gemini API.
   * @param mimeType - The MIME type of the image.
   * @returns A promise that resolves to the generated text.
   * @throws An error if the Gemini API request fails.
   */
  GenerateTextFromMedia: (
    prompt: string,
    base64Image: string,
    mimeType: string
  ) => Promise<string>;
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

  async GenerateTextFromMedia(
    prompt: string,
    base64Image: string,
    mimeType: string
  ): Promise<string> {
    switch (this.LLModel) {
      case "gemini-ai":
        const { string, Error } = await generateGeminiResponseFromMedia(
          prompt,
          base64Image,
          mimeType
        );
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
