import { useCallback, useState } from "react";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { EditDialogTrigger } from "./EditDialogTrigger";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { useUser } from "@/contexts/UserContext";
import { useMaps } from "@/contexts/MapsContext";
import type { FullContact } from "@/contexts/UserContext/types";

interface Props {
  contact: FullContact;
}

export default function EditDropdown({ contact }: Props) {
  const { handleDeleteContact } = useUser();
  const { toast } = useToast();
  const { handleMapPosition } = useMaps();

  const [deleting, setDeleting] = useState(false);

  // Deleting contact from the current user list and simulating a api call
  const handleDeleteSpecifContact = useCallback(() => {
    setDeleting(true);

    setTimeout(() => {
      handleDeleteContact(contact);
      toast({
        title: "Your Contact was deleted. 🗑️",
      });
      setDeleting(false);
      handleMapPosition(null);
    }, 500);
  }, [contact, handleDeleteContact]);

  return (
    <EditDialogTrigger contact={contact}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={handleDeleteSpecifContact}
            className="text-red-500"
            disabled={deleting}
          >
            {deleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </EditDialogTrigger>
  );
}
