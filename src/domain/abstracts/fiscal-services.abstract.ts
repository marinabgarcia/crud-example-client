// import { Client, Receipt } from '../entities';
import {IGenericRepository} from ".";

export abstract class IFiscalServices {
    abstract validateFiscalId(fiscal_id: string): Promise<boolean>;
}
