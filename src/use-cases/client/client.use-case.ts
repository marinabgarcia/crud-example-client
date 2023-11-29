import {Client} from "../../domain/entities";
import {IDataServices} from "../../domain/abstracts";
import {IFiscalServices} from "@/domain/abstracts/fiscal-services.abstract";

export class ClientUseCases {
    constructor(
        private dataServices: IDataServices,
        private fiscalServices: IFiscalServices
    ) {}

    getAllClients(): Promise<Client[]> {
        return this.dataServices.clients.getAll();
    }

    getClientById(id: any): Promise<Client> {
        return this.dataServices.clients.get(id);
    }

    async createClient(client: Client): Promise<Client> {
        try {
            // call to our dependencies
            const createdClient = await this.dataServices.clients.create(
                client
            );

            return createdClient;
        } catch (error) {
            throw error;
        }
    }

    updateClient(client: Client): Promise<Client> {
        return this.dataServices.clients.update(client._id, client);
    }

    validateClient(fiscal_id: string): Promise<boolean> {
        return this.fiscalServices.validateFiscalId(fiscal_id);
    }
}
