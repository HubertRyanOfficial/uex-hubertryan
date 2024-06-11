import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

import Main from "./Main";
import Dashboard from "./Dashboard";

// create query client
const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Root;
