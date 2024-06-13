import { PlusIcon } from "@radix-ui/react-icons";
import ContactList from "./ContactList";
import { CreateSheetTrigger } from "./CreateSheetTrigger";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

export default function ProductWrapper() {
  const { currentUser } = useUser();

  if (currentUser?.contacts && currentUser?.contacts.length === 0) {
    return (
      <>
        <h1 className="text-5xl font-bold">Create new contact</h1>
        <div className="mt-8">
          <CreateSheetTrigger>
            <Button>
              <PlusIcon className="mr-2" /> Create contact
            </Button>
          </CreateSheetTrigger>
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-[1250px] m-auto px-4">
      <h1 className="my-4 text-3xl font-bold max-[400px]:text-2xl max-[400px]:text-center max-[400px]:mt-12">
        Dashboard
      </h1>
      <ContactList />
    </div>
  );
}
