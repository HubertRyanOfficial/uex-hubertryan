import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../AuthContext";

interface DashboardContextProps {
  children: React.ReactNode;
}

const DashboardContext = createContext({
  products: [],
  loading: false,
  refreshProduct: () => {},
});

export function DashboardProvider({ children }: DashboardContextProps) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [contacts, setContact] = useState([]);

  useEffect(() => {
    if (currentUser) {
      handleGetContacts();
    }
  }, [currentUser]);

  const handleGetContacts = useCallback(async () => {}, [currentUser]);

  return (
    <DashboardContext.Provider
      value={{ products: [], loading, refreshProduct: () => {} }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
