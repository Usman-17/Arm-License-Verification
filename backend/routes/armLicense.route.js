import express from "express";
const router = express.Router();

import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createLicense,
  deleteLicense,
  getAllLicenses,
  getlicense,
  getLicenseByNumber,
  updateLicense,
} from "../controllers/armLicense.controller.js";
// Imports End

router.get("/all", protectRoute, getAllLicenses);
router.get("/:id", protectRoute, getlicense);
router.post("/create", protectRoute, createLicense);
router.put("/update/:id", protectRoute, updateLicense);
router.delete("/:id", protectRoute, deleteLicense);
router.get("/number/:licenseNumber", getLicenseByNumber);

export default router;
