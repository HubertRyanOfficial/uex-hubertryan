export interface ContactInfo {
  name: string;
  cpf: string;
  phone: string;
}
export interface ContactAddress {
  cep: string;
  uf: string;
  city: string;
  address: {
    description: string;
    lat: number;
    long: number;
  } | null;
}
