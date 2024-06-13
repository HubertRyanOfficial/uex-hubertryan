import { memo, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCepInfo, getCities, getStates } from "@/services/address";
import type { Cep, Districits, State } from "@/services/address/types";
import { useToast } from "@/components/ui/use-toast";

import ContactAddressAutocomplete from "./ContactAddressAutocomplete";
import type { ContactAddress } from "../types";

interface Props {
  value: ContactAddress;
  onChange: (
    name: keyof ContactAddress,
    value: string | ContactAddress["address"]
  ) => void;
}

function ContactAddressForm({ value, onChange }: Props) {
  const { toast } = useToast();
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

  const debouncedCep = useDebounce(value.cep, 500);

  useEffect(() => {
    async function getCepInfoData() {
      try {
        const currentCepData = await refetchCepInfo();
        if (currentCepData.data) {
          onChange("uf", currentCepData.data.uf || "");
          onChange("city", currentCepData.data.localidade || "");
        }
      } catch (error) {
        toast({
          title: "Error getting CEP information",
          description: "Or this CEP is invalid",
        });
      }
    }

    if (debouncedCep && debouncedCep.length > 4) {
      getCepInfoData();
    }
  }, [debouncedCep]);

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
          onValueChange={(value) => {
            onChange("uf", value);
            onChange("city", "");
          }}
        >
          <SelectTrigger
            disabled={isLoadingStates || isLoadingCep}
            className="w-[131px]"
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
            className="w-[131px]"
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
      <ContactAddressAutocomplete
        value={value.address}
        onChange={(value) => onChange("address", value)}
      />
    </div>
  );
}

export default memo(ContactAddressForm);
