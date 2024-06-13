import { useCallback, useMemo, useState } from "react";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { FullContact } from "@/contexts/UserContext/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ContactInfoForm from "./form/ContactInfoForm";
import ContactAddressForm from "./form/ContactAddressForm";
import { ContactAddress, ContactInfo } from "./types";

import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  children: React.ReactNode;
  contact: FullContact;
}

function EditDialogTrigger({ children, contact }: Props) {
  const { handleEditContact } = useUser();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: contact.name || "",
    cpf: contact.cpf || "",
    phone: contact.phone || "",
  });
  const [contactAddress, setContactAddress] = useState<ContactAddress>({
    cep: contact.cep || "",
    uf: contact.uf || "",
    city: contact.city || "",
    address: contact.address || null,
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
      if (name === "cep" && value === "string") {
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

  const handleEditSelectedContact = useCallback(async () => {
    try {
      setLoading(true);
      const contactData = {
        ...contactInfo,
        ...contactAddress,
      };

      handleEditContact(contactData, contact.cpf);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error editing this contact, try again.",
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
          <SheetTitle>Edit contact</SheetTitle>
          <SheetDescription>
            Edit your contact here. Click save when you're done.
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
            onClick={handleEditSelectedContact}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Edit contact
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditDialogTrigger };
