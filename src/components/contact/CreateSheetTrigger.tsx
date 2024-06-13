import { useCallback, useMemo, useState } from "react";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContactInfoForm from "./form/ContactInfoForm";
import ContactAddressForm from "./form/ContactAddressForm";
import { ContactAddress, ContactInfo } from "./types";

import { useUser } from "@/contexts/UserContext";
import { useToast } from "../ui/use-toast";

interface Props {
  children: React.ReactNode;
}

export function CreateSheetTrigger({ children }: Props) {
  const { handleAddNewContact } = useUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    cpf: "",
    phone: "",
  });
  const [contactAddress, setContactAddress] = useState<ContactAddress>({
    cep: "",
    uf: "",
    city: "",
    address: null,
  });

  const handleContactInfo = useCallback(
    (name: keyof ContactInfo, value: string) => {
      setContactInfo((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  const handleContactAddress = useCallback(
    (name: keyof ContactAddress, value: string | ContactAddress["address"]) => {
      if (name === "cep" && typeof value === "string") {
        const formatedCep = value.replace(/[.\- ]/g, "");
        setContactAddress((prev) => {
          return {
            ...prev,
            cep: formatedCep,
          };
        });
        return;
      }

      setContactAddress((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  const allInputsCompleted = useMemo(
    () =>
      contactInfo.cpf &&
      contactInfo.name &&
      contactInfo.phone &&
      contactAddress.address &&
      contactAddress.cep &&
      contactAddress.city &&
      contactAddress.uf,
    [contactInfo, contactAddress]
  );

  const handleCreateNewContact = useCallback(async () => {
    try {
      setLoading(true);
      const contactData = {
        ...contactInfo,
        ...contactAddress,
      };

      await handleAddNewContact(contactData);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error adding new contact, try again.",
        description: String(error),
      });
    } finally {
      setLoading(false);
    }
  }, [contactInfo, contactAddress]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Create contact</SheetTitle>
          <SheetDescription>
            Create your new contact here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ContactInfoForm value={contactInfo} onChange={handleContactInfo} />
        <ContactAddressForm
          value={contactAddress}
          onChange={handleContactAddress}
        />
        <SheetFooter>
          <Button
            disabled={!allInputsCompleted || loading}
            type="submit"
            onClick={handleCreateNewContact}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Create contact
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
