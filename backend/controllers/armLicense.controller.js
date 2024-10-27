import ArmLicense from "../models/armLicense.model.js";

// PATH     : /api/license/create
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Create License
export const createLicense = async (req, res) => {
  try {
    const {
      licenseNumber,
      fullName,
      dateOfBirth,
      address,
      weaponType,
      issueDate,
      expiryDate,
    } = req.body;

    if (
      !licenseNumber ||
      !fullName ||
      !dateOfBirth ||
      !address ||
      !weaponType ||
      !issueDate ||
      !expiryDate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the skill name already exists
    const existingLicense = await ArmLicense.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ error: "License number already exists" });
    }

    const newLicense = new ArmLicense({
      licenseNumber,
      fullName,
      dateOfBirth,
      address,
      weaponType,
      issueDate,
      expiryDate,
    });

    await newLicense.save();
    return res.status(201).json(newLicense);
  } catch (error) {
    console.error("Error in createLicense controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
