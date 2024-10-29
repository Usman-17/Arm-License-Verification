import { useState } from "react";

import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ email, password });
  };

  const togglePassword = () => setIsShow(!isShow);

  return (
    <div className="flex justify-center items-center py-24 sm:py-8">
      <div className="w-full max-w-sm bg-white px-4 py-8 rounded">
        <div className="grid gap-2 text-center mb-7">
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="text-sm px-6 text-gray-500">
            Enter your email and password below to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 text-sm font-medium text-gray-90">
              Email
            </label>

            <input
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              type="email"
              name="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="mb-2 text-sm font-medium text-gray-90">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                type={isShow ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                onClick={togglePassword}
                className="absolute top-6 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
              >
                {password && (
                  <>{isShow ? <Eye size={18} /> : <EyeOff size={18} />}</>
                )}
              </div>
            </div>
          </div>

          {/* Login  */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white bg-gray-950 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
            >
              {isPending ? <p>Logging in...</p> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
