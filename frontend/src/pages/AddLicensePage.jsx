import { useState } from "react";
import toast from "react-hot-toast";
import { Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const AddLicensePage = () => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    weaponType: "",
    issueDate: "",
    expiryDate: "",
  });

  // Mutation to save License
  const {
    mutate: saveLicense,
    isLoading: isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/license/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save license");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("License created successfully");
      setFormData({
        licenseNumber: "",
        fullName: "",
        dateOfBirth: "",
        address: "",
        weaponType: "",
        issueDate: "",
        expiryDate: "",
      });
    },
    onError: () => {
      toast.error("Failed to create License");
    },
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveLicense(formData);
  };

  return (
    <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xl font-semibold">Add New License</div>
          <p className="text-xs sm:text-sm text-gray-600">
            Fill out the details below to add a license
          </p>
        </div>

        <Link to="/licenses/manage" className="w-fit">
          <button className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg text-sm px-4 py-2.5">
            <Redo size={18} />
            Manage All Licenses
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} aria-label="Add License Form">
        <fieldset className="border border-gray-300 rounded-lg p-4">
          <legend className="text-lg font-semibold text-gray-700">
            License Information
          </legend>

          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="licenseNumber"
                className="text-sm font-medium text-gray-900"
              >
                License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                required
                placeholder="Enter License Number"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                aria-describedby="licenseHelp"
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Enter Full Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.fullName}
                onChange={handleInputChange}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="text-sm font-medium text-gray-900"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                aria-label="Date of Birth"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Enter Address"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.address}
                onChange={handleInputChange}
                autoComplete="street-address"
              />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="weaponType"
                className="text-sm font-medium text-gray-900"
              >
                Weapon Type
              </label>
              <input
                id="weaponType"
                name="weaponType"
                type="text"
                required
                placeholder="Specify Weapon Type"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.weaponType}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="issueDate"
                className="text-sm font-medium text-gray-900"
              >
                Issue Date
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={formData.issueDate}
                onChange={handleInputChange}
                aria-label="Issue Date"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="expiryDate"
              className="text-sm font-medium text-gray-900"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="date"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={formData.expiryDate}
              onChange={handleInputChange}
              aria-label="Expiry Date"
            />
          </div>

          {isError && (
            <div className="text-red-500 font-semibold mt-1" role="alert">
              {error.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full sm:w-auto px-10 py-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg focus:outline-none"
          >
            {isPending ? "Saving..." : "Add License"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLicensePage;
