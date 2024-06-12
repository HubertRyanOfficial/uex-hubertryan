import usePersist from "@/hooks/usePersist";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import dayjs from "dayjs";
import _ from "lodash";

import { useToast } from "@/components/ui/use-toast";
import {
  UserContextType,
  ContactForm,
  FullContact,
  User,
  UserCredentials,
} from "./types";
import { getLocationByAddress } from "@/services/maps";

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextType);

export function AuthProvider({ children }: UserContextProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = usePersist<User[]>("uex-users", []);
  const [currentUser, setCurrentUser, clearCurrentUser] =
    usePersist<User | null>("uex-current-user", null);
  const [loading, setLoading] = useState(true);

  // * Listening if an user is connected or not in the service and redirecting to the correct route
  const handleListenUser = useCallback(() => {
    if (currentUser && location.pathname !== "/dashboard") {
      navigate("/dashboard");
    } else if (location.pathname === "/dashboard" && !currentUser) {
      navigate("/");
    }
    setLoading(false);
  }, [currentUser, location]);

  const syncronizeDataUser = useCallback(() => {
    if (currentUser) {
      const userIndexPostion = users.findIndex(
        (user) => user.email === currentUser.email
      );

      if (!_.isEqual(currentUser, users[userIndexPostion])) {
        let newUsersList = [...users];
        newUsersList[userIndexPostion] = currentUser;
        setUsers(newUsersList);
      }
    }
  }, [currentUser, users]);

  // * Create a new user and persisting it
  const handleSignUp = useCallback(
    (newUser: User) => {
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

  // Log in the user in the service with e-mail and password
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

  // Sign out user cleaning persisted current user data
  const handleSignOut = () => {
    setCurrentUser(null);
    navigate("/");
  };

  // Deleting account from persisted data and signing out current user
  const handleDeleteAccount = useCallback(() => {
    const currentUserIndex = users.findIndex(
      (user) => user.email === currentUser?.email
    );
    const newUsersList = users.filter((_, i) => i !== currentUserIndex);
    setUsers(newUsersList);
    clearCurrentUser();
    toast({
      title: "Account deleted successly",
    });
  }, [currentUser, users, clearCurrentUser]);

  // Creating a new contact and make cpf validation and address location
  const handleAddNewContact = useCallback(
    async (data: ContactForm) => {
      if (!cpf.isValid(data.cpf)) {
        toast({
          title: "Formato do CPF inválido  ❌",
        });
        return;
      }
      if (currentUser) {
        const formatedCpf = data.cpf.replace(".", "").replace("-", "");

        if (currentUser.contacts.find((cont) => cont.cpf === formatedCpf)) {
          toast({
            title: "Esse CPF já existe",
            description: "CPF sendo usado por outro contato.",
          });
          return;
        }

        const address = `${data.city}, ${data.uf}, Brazil`;
        const encodedAddress = encodeURIComponent(address);

        const location = await getLocationByAddress(encodedAddress); // Getting location by enconded address with city and uf
        const position = location[0].geometry;

        const newContact = {
          ...data,
          cpf: formatedCpf,
          created_at: dayjs().valueOf(),
          location: {
            lat: Number(position.location.lat),
            long: Number(position.location.lng),
          },
        };

        const newContacts = [...currentUser.contacts, newContact];
        setCurrentUser({
          ...currentUser,
          contacts: newContacts,
        });
      }

      return;
    },
    [currentUser]
  );

  // Editing contact in array position updating the current User contact
  const handleEditContact = useCallback(
    async (contact: ContactForm) => {
      if (currentUser) {
        if (!cpf.isValid(contact.cpf)) {
          toast({
            title: "Formato do CPF inválido  ❌",
          });
          return;
        }

        const contactIndex = currentUser.contacts.findIndex(
          (cont) => cont.cpf === contact.cpf
        );

        let newContactList = [...currentUser.contacts];

        let location;

        if (
          newContactList[contactIndex] &&
          contact.address !== newContactList[contactIndex].address
        ) {
          const address = `${contact.city}, ${contact.uf}, Brazil`;
          const encodedAddress = encodeURIComponent(address);

          const newLocation = await getLocationByAddress(encodedAddress);
          const position = newLocation[0].geometry;

          location = {
            lat: Number(position.location.lat),
            long: Number(position.location.lng),
          };
        } else {
          location = newContactList[contactIndex].location;
        }

        const formatedCpf = contact.cpf.replace(".", "").replace("-", "");

        newContactList[contactIndex] = {
          ...contact,
          created_at: dayjs().valueOf(),
          cpf: formatedCpf,
          location,
        };

        setCurrentUser({
          ...currentUser,
          contacts: newContactList,
        });
      }
    },
    [currentUser]
  );

  // Deleting contact by cpf updating the current User contact
  const handleDeleteContact = useCallback(
    (contact: FullContact) => {
      if (currentUser) {
        const newContactList = currentUser.contacts.filter(
          (cont) => cont.cpf !== contact.cpf
        );

        setCurrentUser({
          ...currentUser,
          contacts: newContactList,
        });
      }
    },
    [currentUser]
  );

  // Updating the current user in the application with the users global state in every change
  // Check current user route
  useEffect(() => {
    handleListenUser();
    syncronizeDataUser();
  }, [currentUser, users, handleListenUser, syncronizeDataUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        handleSignUp,
        handleLogin,
        handleSignOut,
        handleDeleteAccount,
        handleAddNewContact,
        handleEditContact,
        handleDeleteContact,
      }}
    >
      {!loading ? children : null}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
