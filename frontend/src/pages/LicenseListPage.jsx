import { Link } from "react-router-dom";
import { useGetAllLicense } from "../hooks/useGetAllLicense";
import { Edit3, Redo, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const LicenseListPage = () => {
  const [deletingLicenseId, setDeletingLicenseId] = useState(null);
  const { licenses } = useGetAllLicense();
  const queryClient = useQueryClient();

  //   Delete Mutation
  const {
    mutate: deleteLicense,
    isLoading,
    isPending,
  } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/license/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete license");
      return res.json();
    },

    onSuccess: () => {
      toast.success("License deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      setDeletingLicenseId(null);
    },

    onError: () => {
      toast.error("Failed to delete license");
      setDeletingLicenseId(null);
    },
  });

  return (
    <>
      <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xl font-semibold">View All Licenses</div>
            <p className="text-xs sm:text-sm text-gray-600">
              View and Manage All Licenses
            </p>
          </div>

          <Link to="/license/add" className="w-fit">
            <button className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-800 rounded-lg text-sm px-4 py-2.5">
              <Redo size={18} />
              Add New License
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
                  <th
                    key={heading}
                    scope="col"
                    className="px-6 py-3 text-nowrap"
                  >
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
                      <button
                        onClick={() => setDeletingLicenseId(license._id)}
                        disabled={
                          isLoading && deletingLicenseId === license._id
                        }
                        className={`flex items-center gap-1 px-3 py-1 text-white rounded ${
                          isLoading && deletingLicenseId === license._id
                            ? "bg-red-300"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        <Trash2 size={16} />
                        {isLoading && deletingLicenseId === license._id
                          ? "Deleting..."
                          : "Delete"}
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

      {/* Delete Confirmation Modal */}
      {deletingLicenseId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg py-4 px-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Deletion!
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Are you sure you want to delete this license?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeletingLicenseId(null)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteLicense(deletingLicenseId)}
                disabled={isPending}
                className={`px-4 py-1 rounded text-white ${
                  isPending ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LicenseListPage;
