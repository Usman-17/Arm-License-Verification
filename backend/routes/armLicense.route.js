import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createLicense,
  updateLicense,
} from "../controllers/armLicense.controller.js";
// Imports End

router.put("/update/:id", protectRoute, updateLicense);
router.post("/create", protectRoute, createLicense);

export default router;
