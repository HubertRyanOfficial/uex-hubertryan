import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

import Main from "./Main";
import Dashboard from "./Dashboard";

// create query client
const queryClient = new QueryClient();

function Root() {
  return (
    <APIProvider apiKey={String(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </APIProvider>
  );
}

export default Root;
