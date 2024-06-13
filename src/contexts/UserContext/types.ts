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
  address: {
    description: string;
    lat: number;
    long: number;
  } | null;
}

export interface FullContact extends ContactForm {
  created_at: number;
}
export interface User extends UserCredentials {
  contacts: FullContact[];
}

interface UserContextValues {
  currentUser: User | null;
}

interface UserContextHandles {
  handleSignUp: (newUser: User) => void;
  handleLogin: (credentials: UserCredentials) => void;
  handleSignOut: () => void;
  handleDeleteAccount: () => void;
  handleAddNewContact: (contact: ContactForm) => Promise<void>;
  handleEditContact: (contact: ContactForm) => Promise<void>;
  handleDeleteContact: (contact: FullContact) => void;
}

export type UserContextType = UserContextValues & UserContextHandles;
