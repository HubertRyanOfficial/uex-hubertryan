import { Label } from "../ui/label";
import { Input } from "../ui/input";

import type { ContactAddress } from "./types";

interface Props {
  value: ContactAddress;
  onChange: (name: keyof ContactAddress, value: string) => void;
}

export default function ContactAddressForm({ value, onChange }: Props) {
  return (
    <div className="grid gap-4 py-4">
      <p className="text-base text-gray-400 font-medium">Address</p>
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
    </div>
  );
}
