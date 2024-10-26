import express from "express";
const router = express.Router();

import { adminLogin, signup } from "../controllers/auth.controller.js";
// Imports End

router.post("/signup", signup);
router.post("/admin/login", adminLogin);

export default router;
