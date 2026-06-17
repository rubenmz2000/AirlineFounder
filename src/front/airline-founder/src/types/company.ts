export interface Company {
    id: number;
    name: string;
    icaoCode: string;
    iataCode: string;
    homeBase: string;
    country: string;
    money: number;
}

export interface CreateCompanyRequest {
    name: string;
    icaoCode: string;
    iataCode: string;
    homeBase: string;
    country: string;
}