import { useState } from "react";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: logoutMutation, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/auth/admin/logout`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log out user");
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] relative">
      <div className="flex items-center justify-between py-3 sm:py-4 font-medium">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            to="/"
            className="text-gray-800 transition-colors duration-300 hover:text-purple-700 hover:underline"
          >
            Home
          </Link>
          {authUser ? (
            <>
              <Link
                to="/license/add"
                className="text-gray-800 transition-colors duration-300 hover:text-purple-700 hover:underline"
              >
                Add License
              </Link>
              <Link
                to="/licenses/manage"
                className="text-gray-800 transition-colors duration-300 hover:text-purple-700 hover:underline"
              >
                Manage License
              </Link>
              <button
                onClick={() => logoutMutation()}
                className="text-gray-800 transition-colors duration-300 hover:text-purple-700 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 transition-colors duration-300 hover:text-purple-700"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          {isMobileMenuOpen ? (
            <X className="text-2xl text-gray-800" />
          ) : (
            <Menu className="text-2xl text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg p-4 absolute top-full left-0 right-0 z-50">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="block py-2 text-gray-800 transition-colors duration-300 hover:text-purple-700"
          >
            Home
          </Link>
          {authUser ? (
            <>
              <Link
                to="/license/add"
                onClick={toggleMobileMenu}
                className="block py-2 text-gray-800 transition-colors duration-300 hover:text-purple-700"
              >
                Add License
              </Link>
              <Link
                to="/licenses/manage"
                onClick={toggleMobileMenu}
                className="block py-2 text-gray-800 transition-colors duration-300 hover:text-purple-700"
              >
                Manage License
              </Link>
              <button
                onClick={() => {
                  toggleMobileMenu();
                  logoutMutation();
                }}
                className="block w-full text-left py-2 text-gray-800 transition-colors duration-300 hover:text-purple-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="block py-2 text-gray-800 transition-colors duration-300 hover:text-purple-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
