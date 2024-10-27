import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createLicense,
  getAllLicenses,
  updateLicense,
} from "../controllers/armLicense.controller.js";
// Imports End

router.put("/update/:id", protectRoute, updateLicense);
router.post("/create", protectRoute, createLicense);
router.get("/all", protectRoute, getAllLicenses);

export default router;
