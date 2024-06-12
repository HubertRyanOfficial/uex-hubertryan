import { useCallback, useEffect, useState } from "react";

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

interface Props {
  value: ContactAddress;
  onChange: (e: string) => void;
}

export default function ContactAddressAutocomplete({ value, onChange }: Props) {
  const debouncedAddress = useDebounce(value.address, 500);
  const [showsCommandList, setShowsCommandList] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["address", value],
    queryFn: () => getSuggestions(value),
    enabled: false,
  });

  useEffect(() => {
    if (debouncedAddress) {
      refetch();
    }
  }, [debouncedAddress]);

  const handleChooseAddress = useCallback(
    (addressSelected: string) => {
      onChange(addressSelected);
      setShowsCommandList(false);
    },
    [onChange]
  );

  return (
    <div className="w-full flex flex-col items-end pb-8">
      <div className="w-[86%]">
        <Input
          id="address"
          value={value.address}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowsCommandList(true)}
          placeholder="Enter address details (e.g., street, city)."
        />
        {showsCommandList && (
          <Command className="rounded-lg border shadow-md">
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
