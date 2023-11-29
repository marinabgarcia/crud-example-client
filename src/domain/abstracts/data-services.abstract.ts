// import { Client, Receipt } from '../entities';
import {IGenericRepository} from ".";

export abstract class IDataServices {
    abstract clients: IGenericRepository<any>;
}
