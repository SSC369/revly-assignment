import express from "express";
import { analyzePerformance } from "../controllers/performanceController.js";

const router = express.Router();

router.post("/analyze", analyzePerformance);

export default router;
