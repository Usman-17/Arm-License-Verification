import express from "express";
const router = express.Router();

import {
  adminLogin,
  adminLogout,
  getMe,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
// Imports End

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

export default router;
