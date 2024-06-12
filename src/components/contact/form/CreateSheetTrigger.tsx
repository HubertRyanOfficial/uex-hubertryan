import { useCallback, useState } from "react";

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
import ContactInfoForm from "./ContactInfoForm";
import ContactAddressForm from "./ContactAddressForm";

import { ContactAddress, ContactInfo } from "./types";

interface Props {
  children: React.ReactNode;
}

export function CreateSheetTrigger({ children }: Props) {
  const [open, setOpen] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    name: "",
    cpf: "",
    phone: "",
  });
  const [contactAddress, setContactAddress] = useState({
    cep: "",
    uf: "",
    city: "",
    address: "",
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
    (name: keyof ContactAddress, value: string) => {
      if (name === "cep") {
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
          <Button type="submit" onClick={() => {}}>
            {/* {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} */}
            Create contact
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
