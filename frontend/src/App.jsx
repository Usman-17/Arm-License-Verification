import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import LicenseListPage from "./pages/LicenseListPage";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/licenses/manage" element={<LicenseListPage />} />
        </Routes>

        <Toaster
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fffbfb",
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}
