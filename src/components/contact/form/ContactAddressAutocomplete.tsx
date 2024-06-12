import { memo, useCallback, useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

import { getSuggestions } from "@/services/maps";
import { ContactAddress } from "./types";
import { X } from "lucide-react";

interface Props {
  value: ContactAddress;
  onChange: (e: string) => void;
}

function ContactAddressAutocomplete({ value, onChange }: Props) {
  const [searchValue, setSearchValue] = useState(value.address);
  const debouncedAddress = useDebounce(searchValue, 500);
  const [showsCommandList, setShowsCommandList] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["address", value],
    queryFn: () => getSuggestions(value),
    enabled: false,
  });

  useEffect(() => {
    if (debouncedAddress) {
      refetch();
      setShowsCommandList(true);
    } else if (!debouncedAddress) {
      setShowsCommandList(false);
    }
  }, [debouncedAddress]);

  const handleChooseAddress = useCallback(
    (addressSelected: string) => {
      onChange(addressSelected);
      setShowsCommandList(false);
    },
    [onChange, searchValue]
  );

  return (
    <div className="w-full flex flex-col items-end pb-10">
      <div className="w-[86%]">
        {!value.address ? (
          <Input
            id="address"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter address details (e.g., street, city)."
          />
        ) : (
          <div className="border-[1px] border-gray px-3 py-2 rounded-lg shadow-sm flex flex-row items-center justify-between hover:opacity-80 transition-opacity cursor-default">
            <span className="text-sm">{`${value.address.slice(
              0,
              value.address.length - 10
            )}...`}</span>
            <div
              role="button"
              onClick={() => {
                onChange("");
                setSearchValue("");
              }}
            >
              <X />
            </div>
          </div>
        )}
        {showsCommandList && (
          <Command className="rounded-lg border shadow-md mt-2">
            {data && (
              <CommandList>
                {data.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {data.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {data.map((address) => (
                      <div
                        role="button"
                        onClick={() => handleChooseAddress(address.description)}
                      >
                        <CommandItem key={address.place_id}>
                          <span>{address.description}</span>
                        </CommandItem>
                      </div>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            )}
          </Command>
        )}
      </div>
    </div>
  );
}

export default memo(ContactAddressAutocomplete);
