import { Link } from "react-router-dom";
import { useGetAllLicense } from "../hooks/useGetAllLicense";
import { Edit3, Redo, Trash2 } from "lucide-react";

const LicenseListPage = () => {
  const { licenses } = useGetAllLicense();

  return (
    <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xl font-semibold">View All License</div>
          <p className="text-xs sm:text-sm text-gray-600">
            View and Manage All License
          </p>
        </div>

        <Link to="/license/add" className="w-fit">
          <button className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg text-sm px-4 py-2.5">
            <Redo size={18} />
            Add New Project
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs font-semibold uppercase text-gray-700 bg-gray-50">
            <tr>
              {[
                "Sr No.",
                "License Number",
                "Full Name",
                "Issue Date",
                "Expiry Date",
                "Weapon Type",
                "Actions",
              ].map((heading) => (
                <th key={heading} scope="col" className="px-6 py-3 text-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {licenses && licenses.length > 0 ? (
              licenses.map((license, index) => (
                <tr key={license.licenseNumber} className="border-b">
                  <td className="px-6 py-4 text-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {license.licenseNumber}
                  </td>
                  <td className="px-6 py-4">{license.fullName}</td>
                  <td className="px-6 py-4">{license.issueDate}</td>
                  <td className="px-6 py-4">{license.expiryDate}</td>
                  <td className="px-6 py-4">{license.weaponType}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {/* Edit Btn */}
                    <button className="flex items-center gap-1 px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded">
                      <Edit3 size={16} />
                      Edit
                    </button>

                    {/* Delete Btn */}
                    <button className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center">
                  No licenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LicenseListPage;
