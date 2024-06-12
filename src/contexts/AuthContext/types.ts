export interface UserCredentials {
  email: string;
  password: string;
}

export interface ContactForm {
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  uf: string;
  city: string;
  address: string;
}

export interface FullContact extends ContactForm {
  created_at: number;
  location: {
    lat: number;
    long: number;
  };
}
export interface User extends UserCredentials {
  contacts: FullContact[];
}

interface AuthContextValues {
  currentUser: User | null;
}

interface AuthContextHandles {
  handleSignUp: (newUser: User) => void;
  handleLogin: (credentials: UserCredentials) => void;
  handleSignOut: () => void;
  handleDeleteAccount: () => void;
  handleAddNewContact: (contact: ContactForm) => Promise<void>;
  handleEditContact: (contact: ContactForm) => Promise<void>;
  handleDeleteContact: (contact: FullContact) => void;
}

export type AuthContextType = AuthContextValues & AuthContextHandles;
