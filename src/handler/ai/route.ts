import { Router } from "express";

const router = Router();

import { AiController } from "../../controller/ai/controller";

const aiController = new AiController("gemini-ai");

router.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const text = await aiController.GenerateText(prompt);
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
