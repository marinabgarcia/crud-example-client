import {Client} from "./index";

export interface Receipt {
    date: string;
    client: Client;
    tax_amount: number;
    tax_percentage: number;
    _id: string;
    isApproved: boolean;
}
