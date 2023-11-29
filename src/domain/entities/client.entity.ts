import {Receipt} from ".";

export interface Client {
    client_id: number;
    fiscal_id: string;
    company_name: string;
    receipts: Receipt[];
    _id: string;
    isValid: boolean;
}
