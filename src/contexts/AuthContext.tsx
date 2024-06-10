import { createContext, useCallback, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }: AuthContextProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider value={null}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}
