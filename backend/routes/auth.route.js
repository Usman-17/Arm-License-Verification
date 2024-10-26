import express from "express";
const router = express.Router();

import { signup } from "../controllers/auth.controller.js";
// Imports End

router.post("/signup", signup);

export default router;
