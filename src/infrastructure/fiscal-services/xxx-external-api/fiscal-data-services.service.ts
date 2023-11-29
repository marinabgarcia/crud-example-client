import {IDataServices} from "@/domain/abstracts";
import {Client} from "@/domain/entities";
import {IFiscalServices} from "@/domain/abstracts/fiscal-services.abstract";

export class FiscalDataServices implements IFiscalServices {
    constructor() {}

    validateFiscalId(fiscal_id: string): Promise<boolean> {
        return new Promise(function (resolve) {
            setTimeout(resolve, 500, true);
        });
    }
}
