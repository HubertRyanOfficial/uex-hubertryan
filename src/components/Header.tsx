import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { useUser } from "@/contexts/UserContext";

export default function Header() {
  const { handleSignOut, handleDeleteAccount, currentUser } = useUser();

  return (
    <header className="bg-white h-[6vh] px-8 flex flex-row items-center justify-end shadow-sm ">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser && (
              <Button variant="outline">{currentUser.email}</Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 mt-4">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteAccount}
              className="text-red-500"
            >
              Delete account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
