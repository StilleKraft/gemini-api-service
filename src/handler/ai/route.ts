import { Router } from "express";
import multer from "multer";

const router = Router();

import { AiController } from "../../controller/ai/controller";

const aiController = new AiController("gemini-ai");
const upload = multer();

// Generate text
router.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const text = await aiController.GenerateText(prompt);
    return res.status(200).json({ output: text });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Generate text from image
router.post(
  "/generate-from-image",
  upload.single("image"),
  async (req, res) => {
    const { prompt } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message:
          "Image file is required. Ensure Content-Type is multipart/form-data and field name is 'image'.",
      });
    }

    const base64Image = req.file.buffer.toString("base64");

    if (!prompt || !base64Image || !req.file.mimetype) {
      return res
        .status(400)
        .json({ message: "Prompt, image, and mimetype are required" });
    }

    if (!["image/jpeg", "image/png"].includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Only JPEG and PNG files are supported.",
      });
    }

    try {
      const text = await aiController.GenerateTextFromMedia(
        prompt,
        base64Image,
        req.file?.mimetype
      );
      return res.status(200).json({ output: text });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Generate text from image
router.post(
  "/generate-from-document",
  upload.single("document"),
  async (req, res) => {
    const { prompt } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message:
          "Document file is required. Ensure Content-Type is multipart/form-data and field name is 'document'.",
      });
    }

    const base64Document = req.file.buffer.toString("base64");

    if (!base64Document || !req.file.mimetype) {
      return res
        .status(400)
        .json({ message: "Document, and mimetype are required" });
    }

    if (!["application/pdf"].includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Only PDF files are supported.",
      });
    }

    try {
      const text = await aiController.GenerateTextFromMedia(
        prompt ?? "Tolong buatkan ringkasan dari dokumen berikut",
        base64Document,
        req.file?.mimetype
      );
      return res.status(200).json({ output: text });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Generate text from audio
router.post(
  "/generate-from-audio",
  upload.single("audio"),
  async (req, res) => {
    const { prompt } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message:
          "Audio file is required. Ensure Content-Type is multipart/form-data and field name is 'audio'.",
      });
    }

    const base64Audio = req.file.buffer.toString("base64");

    if (!base64Audio || !req.file.mimetype) {
      return res
        .status(400)
        .json({ message: "Audio, and mimetype are required" });
    }

    if (!["audio/mpeg"].includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Only MP3 files are supported.",
      });
    }

    try {
      const text = await aiController.GenerateTextFromMedia(
        prompt ?? "Tolong buatkan transkrip dari audio berikut",
        base64Audio,
        req.file?.mimetype
      );
      return res.status(200).json({ output: text });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
