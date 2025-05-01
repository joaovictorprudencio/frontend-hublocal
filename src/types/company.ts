
export interface Location {
    id: number;
    name: string;
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    companyId: number; 
  }



export interface Company {
    id: number;
    name: string;
    website: string;
    cnpj: string;
    userId: number;
    locations: Location[];
  }