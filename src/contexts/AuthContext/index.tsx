import usePersist from "@/hooks/usePersist";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { AuthContextType, User, UserCredentials } from "./types";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers, clearUsers] = usePersist<User[]>("uex-users", []);
  const [currentUser, setCurrentUser, clearCurrentUser] =
    usePersist<User | null>("uex-current-user", null);
  const [loading, setLoading] = useState(true);

  console.log(users);

  // * Listening if an user is connected or not in the service and redirecting to the correct route
  const handleListenUser = useCallback(async () => {
    if (currentUser && location.pathname !== "/dashboard") {
      navigate("/dashboard");
    } else if (location.pathname === "/dashboard" && !currentUser) {
      navigate("/");
    }
    setLoading(false);
  }, [currentUser, location]);

  // * Create a new user and persisting it
  const handleSignUp = useCallback(
    async (newUser: User) => {
      const findUserWithEmail = users.find(
        (user) => user.email === newUser.email
      );
      if (findUserWithEmail) {
        throw "A user with this email already exists.";
      }

      setUsers([...users, newUser]);
    },
    [users]
  );

  // * Log in the user in the service with e-mail and password
  const handleLogin = useCallback(
    async (credentials: UserCredentials) => {
      const findUserWithEmail = users.find(
        (user) => user.email === credentials.email
      );
      if (!findUserWithEmail) {
        throw "A user with this email doesn't exists. Create a new account!";
      }

      if (findUserWithEmail.password !== credentials.password) {
        throw "Password incorrect!";
      }

      setCurrentUser(findUserWithEmail);
    },
    [users]
  );

  // * Sign out user cleaning persisted current user data
  const handleSignOut = () => clearCurrentUser();

  useEffect(() => {
    handleListenUser();
  }, [currentUser, handleListenUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, handleSignUp, handleLogin, handleSignOut }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
