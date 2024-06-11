import { memo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import type { ContactAddress } from "./types";

import { getCepInfo, getCities, getStates } from "@/services/address";
import type { Cep, Districits, State } from "@/services/address/types";

interface Props {
  value: ContactAddress & { debouncedCep: string };
  onChange: (name: keyof ContactAddress, value: string) => void;
}

function ContactAddressForm({ value, onChange }: Props) {
  const { data: statesData, isLoading: isLoadingStates } = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: citiesData, isLoading: isLoadingCities } = useQuery<
    Districits[]
  >({
    queryKey: ["cities", value.uf],
    queryFn: () => getCities(value.uf),
  });

  const { refetch: refetchCepInfo, isLoading: isLoadingCep } = useQuery<Cep>({
    queryKey: ["cep", value.cep],
    queryFn: () => getCepInfo(value.cep),
    enabled: false,
  });

  useEffect(() => {
    async function getCepInfo() {
      const currentCepData = await refetchCepInfo();
      if (currentCepData.data) {
        onChange("uf", currentCepData.data.uf || "");
        onChange("city", currentCepData.data.localidade || "");
      }
    }

    if (value.debouncedCep && value.debouncedCep.length > 4) {
      getCepInfo();
    }
  }, [value.debouncedCep]);

  return (
    <div className="grid gap-4 pb-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cep" className="text-right">
          CEP
        </Label>
        <Input
          id="cep"
          value={value.cep}
          onChange={(e) => onChange("cep", e.target.value)}
          className="col-span-3"
          placeholder="CEP"
        />
      </div>
      <div className="flex flex-row gap-x-4 justify-end">
        <Select
          value={value.uf}
          onValueChange={(value) => onChange("uf", value)}
        >
          <SelectTrigger
            disabled={isLoadingStates || isLoadingCep}
            className="w-[154px]"
          >
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {statesData &&
              statesData.map((state) => (
                <SelectItem key={state.id} value={state.sigla}>
                  {state.nome}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select
          value={value.city}
          onValueChange={(value) => onChange("city", value)}
        >
          <SelectTrigger
            disabled={!value.uf || isLoadingCities || isLoadingCep}
            className="w-[154px]"
          >
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {citiesData &&
              citiesData.map((city) => (
                <SelectItem key={city.id} value={city.nome}>
                  {city.nome}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex justify-end">
        <Command className="rounded-lg border shadow-md w-[86%]">
          <CommandInput placeholder="Enter address details (e.g., street, city)." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <span>Rua Pasteur 463, Curitiba, Paraná BR</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

export default memo(ContactAddressForm);
