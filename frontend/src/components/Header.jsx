import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: logoutMutation, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/auth/admin/logout`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to logout user");
      }
      return data;
    },

    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

    onError: () => {
      toast.error(error.message);
    },
  });

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="flex items-center justify-between py-2.5 sm:py-2 font-medium">
        <Link to="/">
          <img src={logo} alt="logo" className="w-12 h-12" />
        </Link>

        <nav>
          {authUser ? (
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/license/add"
                  className="text-gray-800 transition-colors duration-300 ease-in-out hover:text-purple-700 hover:underline"
                >
                  Add License
                </Link>
              </li>
              <li>
                <Link
                  to="/licenses/manage"
                  className="text-gray-800 transition-colors duration-300 ease-in-out hover:text-purple-700 hover:underline"
                >
                  Manage License
                </Link>
              </li>
              <li
                onClick={() => logoutMutation()}
                className="text-gray-800 transition-colors duration-300 ease-in-out hover:text-purple-700 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 transition-colors duration-300 ease-in-out hover:text-purple-700"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
