import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import { createLicense } from "../controllers/armLicense.controller.js";
// Imports End

router.post("/create", protectRoute, createLicense);

export default router;
