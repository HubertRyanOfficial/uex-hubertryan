import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

import type { ContactInfo } from "../types";

interface Props {
  value: ContactInfo;
  onChange: (name: keyof ContactInfo, value: string) => void;
}

function ContactInfoForm({ value, onChange }: Props) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={value.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="col-span-3"
          placeholder="Name"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cpf" className="text-right">
          CPF
        </Label>
        <Input
          id="cpf"
          value={value.cpf}
          onChange={(e) => onChange("cpf", e.target.value)}
          className="col-span-3"
          placeholder="CPF"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone number
        </Label>
        <Input
          id="phone"
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="col-span-3"
          placeholder="Phone number"
        />
      </div>
    </div>
  );
}

export default ContactInfoForm;
