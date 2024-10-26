import express from "express";
const router = express.Router();

import {
  adminLogin,
  adminLogout,
  signup,
} from "../controllers/auth.controller.js";
// Imports End

router.post("/signup", signup);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

export default router;
