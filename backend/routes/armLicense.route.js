import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createLicense,
  getAllLicenses,
  getlicense,
  updateLicense,
} from "../controllers/armLicense.controller.js";
// Imports End

router.get("/all", protectRoute, getAllLicenses);
router.get("/:id", protectRoute, getlicense);
router.post("/create", protectRoute, createLicense);
router.put("/update/:id", protectRoute, updateLicense);

export default router;