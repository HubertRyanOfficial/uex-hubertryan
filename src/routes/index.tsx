import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardProvider } from "@/contexts/DashboardContext";

import Main from "./Main";
import Dashboard from "./Dashboard";

function Root() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </DashboardProvider>
    </AuthProvider>
  );
}

export default Root;
