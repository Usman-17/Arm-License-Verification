import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// PATH     : /api/auth/signup
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Create User
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // Pakistani mobile number validation
    const pakistaniMobileRegex = /^03\d{9}$/;
    if (mobile.length !== 11 || !pakistaniMobileRegex.test(mobile)) {
      return res.status(400).json({
        error:
          "Please provide a valid 11-digit Pakistani mobile number (e.g., 03XXXXXXXXX)",
      });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email is already taken"
            : "Phone Number is already taken",
      });
    }

    // Password validation
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    } else if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one uppercase letter" });
    } else if (!/[a-z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one lowercase letter" });
    } else if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one number" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Send success response
    res.status(201).json({
      message: "Account created successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/auth/admin/login
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Login a Admin
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address",
      });
    }

    // Find admin by email
    const admin = await User.findOne({ email });

    // Check if admin exists
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Invalid email or password" });
    }

    // Compare provided password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(admin, res);

    // Send admin info in response
    res.status(200).json({
      status: "success",
      data: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        mobile: admin.mobile,
      },
    });
  } catch (error) {
    console.error("Error in adminLogin controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
