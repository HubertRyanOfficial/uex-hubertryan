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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function CreateSheetTrigger({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    cpf: "",
    phone: "",
  });

  const handleContactInfo = (name: string, value: string) => {
    setContactInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={contactInfo.name}
              onChange={(e) => handleContactInfo("name", e.target.value)}
              className="col-span-3"
              placeholder="Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              value={contactInfo.cpf}
              onChange={(e) => handleContactInfo("cpf", e.target.value)}
              className="col-span-3"
              placeholder="CPF"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Phone number
            </Label>
            <Input
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => handleContactInfo("phone", e.target.value)}
              className="col-span-3"
              placeholder="Phone number"
            />
          </div>
        </div>
        <SheetFooter>
          <Button disabled={loading} type="submit" onClick={() => {}}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Create contact
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
