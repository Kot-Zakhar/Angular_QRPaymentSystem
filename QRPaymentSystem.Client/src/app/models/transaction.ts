import { TransactionJwt } from './transactionJwt';
import { TransactionDescription } from './transactionDescription';

export class Transaction {
    constructor(token: TransactionJwt, rawToken: string) {
        this.rawToken = rawToken;
        this.description = new TransactionDescription(token);
    }

    get id() {
        return this.description.id;
    }

    rawToken: string;
    description: TransactionDescription;
    validated = false;
    completed = false;
}
