import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/contexts/AuthContext";

import Main from "./Main";
import Dashboard from "./Dashboard";

function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default Root;
