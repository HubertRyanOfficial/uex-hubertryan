export interface UserCredentials {
  email: string;
  password: string;
}

export interface User extends UserCredentials {
  contacts: any;
}

interface AuthContextValues {
  currentUser: User | null;
}

interface AuthContextHandles {
  handleSignUp: (newUser: User) => void;
  handleLogin: (credentials: UserCredentials) => void;
  handleSignOut: () => void;
  handleDeleteAccount: () => void;
}

export type AuthContextType = AuthContextValues & AuthContextHandles;
