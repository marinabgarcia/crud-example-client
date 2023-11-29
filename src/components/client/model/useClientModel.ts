import {Client, Receipt} from "@/domain/entities";
import {APIDataServices} from "@/infrastructure/data-services/api/api-data-services.service";
import {FiscalDataServices} from "@/infrastructure/fiscal-services/xxx-external-api/fiscal-data-services.service";
import {ClientUseCases} from "@/use-cases/client";
import {useState} from "react";

export interface IError {
    field: string;
    error: string;
}

export default function useClientModel() {
    const [clients, setClients] = useState<Client[]>([]);
    const [active, setActive] = useState<Partial<Client>>({});
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<IError[] | null>();

    const dataService = new APIDataServices();
    const fiscalService = new FiscalDataServices();

    const clientUseCases = new ClientUseCases(dataService, fiscalService);

    function _resetActive() {
        setActive({});
    }

    function changeActiveClient(client: Partial<Client>) {
        setActive((active) => {
            return {...active, ...client};
        });
    }

    async function getAll() {
        setIsFetching(true);
        setError(null);
        try {
            setClients(await clientUseCases.getAllClients());
        } catch (e) {
            setError(e.message);
        }
        setIsFetching(false);
    }

    async function create() {
        setIsSaving(true);
        setError(null);
        try {
            let client = await clientUseCases.createClient(active as Client);
            setActive(client);
        } catch (e) {
            setError(e.message);
        }
        setIsSaving(false);
    }

    async function update() {
        setIsSaving(true);
        setError(null);
        try {
            let client = await clientUseCases.updateClient(active as Client);
            setActive(client);
            setClients((clients) => {
                const newer = clients.map((item) => {
                    const new_info = client._id === item._id ? client : {};

                    return {
                        ...item,
                        ...new_info,
                    };
                });
                return newer;
            });
        } catch (e) {
            setError(e.message);
        }
        setIsSaving(false);
    }

    async function validate() {
        setIsValidating(true);
        setError(null);
        if (active.fiscal_id) {
            let res = await clientUseCases.validateClient(active.fiscal_id);
            changeActiveClient({isValid: res});
        }
        setIsValidating(false);
    }

    //Recipts
    function addReceiptActiveClient(receipt: Receipt) {
        setActive((active) => {
            let prev = active.receipts ? active.receipts : [];
            return {
                ...active,
                ...{receipts: [...prev, receipt]},
            } as Partial<Client>;
        });
    }

    function updateReceiptActiveClient(receipt: Partial<Receipt>) {
        setActive((active) => {
            let prev = active.receipts ? active.receipts : [];

            const newer = prev.map((item) => {
                const new_info = receipt._id === item._id ? receipt : {};

                return {
                    ...item,
                    ...new_info,
                };
            });
            return {
                ...active,
                ...{receipts: newer},
            } as Partial<Client>;
        });
    }

    return {
        getAll,
        clients,
        active,
        changeActiveClient,
        isSaving,
        addReceiptActiveClient,
        updateReceiptActiveClient,
        create,
        update,
        setActive,
        _resetActive,
        validate,
        isValidating,
        isFetching,
        error,
    };
}
