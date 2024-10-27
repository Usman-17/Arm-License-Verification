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

// PATH     : /api/license/update/id
// METHOD   : PUT
// ACCESS   : PRIVATE
// DESC     : Update License
export const updateLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      licenseNumber,
      fullName,
      dateOfBirth,
      address,
      weaponType,
      issueDate,
      expiryDate,
    } = req.body;

    const license = await ArmLicense.findById(id);

    if (!license) {
      return res.status(404).json({ error: "License not found" });
    }

    if (licenseNumber) license.licenseNumber = licenseNumber;
    if (fullName) license.fullName = fullName;
    if (dateOfBirth) license.dateOfBirth = dateOfBirth;
    if (address) license.address = address;
    if (weaponType) license.weaponType = weaponType;
    if (issueDate) license.issueDate = issueDate;
    if (expiryDate) license.expiryDate = expiryDate;

    await license.save();
    res.status(200).json({
      success: true,
      license,
    });
  } catch (error) {
    console.error("Error in updateLicense", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/license/all
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get all Licenses
export const getAllLicenses = async (req, res) => {
  try {
    const licenses = await ArmLicense.find().sort({ createdAt: -1 });

    if (!licenses || licenses.length === 0) return res.status(200).json([]);

    return res.status(200).json(licenses);
  } catch (error) {
    console.log("Error in getAllLicenses Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
