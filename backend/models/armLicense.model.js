import mongoose from "mongoose";

const armLicenseSchema = new mongoose.Schema(
  {
    licenseNumber: {
      type: String,
      required: true,
      minlength: [5, "License number must be at least 5 characters long"],
    },

    fullName: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    weaponType: {
      type: String,
      required: true,
    },

    issueDate: {
      type: String,
      required: true,
    },

    expiryDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArmLicense = mongoose.model("ArmLicense", armLicenseSchema);

export default ArmLicense;
