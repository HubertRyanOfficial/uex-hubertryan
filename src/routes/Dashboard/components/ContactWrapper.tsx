import { PlusIcon } from "@radix-ui/react-icons";
import ContactList from "./ContactList";
import { CreateSheetTrigger } from "./CreateSheetTrigger";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

export default function ProductWrapper() {
  const loading = false;
  const products = [];

  if (loading) {
    return <Loader color="#000000" />;
  }

  if (products.length === 0) {
    return (
      <>
        <h1 className="text-5xl font-bold">Create new contact</h1>
        <div className="mt-8">
          <CreateSheetTrigger>
            <Button>
              <PlusIcon className="mr-2" /> Create Contact
            </Button>
          </CreateSheetTrigger>
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-[1100px] m-auto px-4 ">
      <h1 className="my-4 text-3xl font-bold max-[400px]:text-2xl max-[400px]:text-center max-[400px]:mt-12">
        Dashboard
      </h1>
      <ContactList />
    </div>
  );
}
