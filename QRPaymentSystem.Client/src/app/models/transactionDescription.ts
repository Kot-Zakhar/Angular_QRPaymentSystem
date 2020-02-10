import { TransactionJwt } from './transactionJwt';

export class TransactionDescription {
    constructor(token: TransactionJwt) {
        this.id = token.jti;
        this.creationDate = new Date(token.iat * 1000);
        this.creatorId = token.iss;

        this.from = token.sub;
        this.to = token.aud;
        this.amount = token.amt;
        this.currency = token.cur;
        this.expirationDate = token.exp ? new Date(token.exp * 1000) : undefined;
        this.notBeforeDate = token.nbf ? new Date(token.nbf * 1000) : undefined;
        this.quantity = token.qty;
    }
    id: string;
    creationDate: Date;
    creatorId: string;

    from?: string;
    to?: string;
    amount?: number;
    currency?: string;
    expirationDate?: Date;
    notBeforeDate?: Date;
    quantity?: number;
}
