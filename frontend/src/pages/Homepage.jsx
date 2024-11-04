import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

const Homepage = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const {
    data: licenseDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["license", licenseNumber],
    queryFn: async () => {
      const res = await fetch(`/api/license/number/${licenseNumber}`);
      if (!res.ok) {
        throw new Error("License not found or invalid license number.");
      }
      return res.json();
    },
    enabled: searchClicked && !!licenseNumber,
    retry: false,
  });

  const handleInputChange = (e) => {
    setLicenseNumber(e.target.value);
    setSearchClicked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchClicked(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 pt-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Search License Details
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <div className="relative">
          <input
            type="text"
            value={licenseNumber}
            onChange={handleInputChange}
            placeholder="Enter License Number"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <div className="absolute top-6 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700">
            <button type="submit">
              <Search className="hover:text-blue-700" />
            </button>
          </div>
        </div>
      </form>

      {isLoading && (
        <p className="text-gray-500 font-semibold mb-4">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 font-semibold mb-4">{error.message}</p>
      )}

      {searchClicked && licenseDetails && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">License Details</h2>
          <p>
            <strong>License Number:</strong> {licenseDetails.licenseNumber}
          </p>
          <p>
            <strong>Full Name:</strong> {licenseDetails.fullName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {licenseDetails.dateOfBirth}
          </p>
          <p>
            <strong>Address:</strong> {licenseDetails.address}
          </p>
          <p>
            <strong>Weapon Type:</strong> {licenseDetails.weaponType}
          </p>
          <p>
            <strong>Issue Date:</strong> {licenseDetails.issueDate}
          </p>
          <p>
            <strong>Expiry Date:</strong> {licenseDetails.expiryDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
