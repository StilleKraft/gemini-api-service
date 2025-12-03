import { Router } from "express";
import aiRouter from "./ai/route";

const router = Router();

router.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

// AI Routes
router.use("/gemini", aiRouter);

export default router;
