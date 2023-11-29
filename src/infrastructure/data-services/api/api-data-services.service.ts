import {IDataServices} from "@/domain/abstracts";
import {APIGenericRepository} from "./api-generic.repository";
import {Client} from "@/domain/entities";

export class APIDataServices implements IDataServices {
    clients: APIGenericRepository<Client>;

    constructor() {
        this.clients = new APIGenericRepository<Client>("clients");
    }
}
