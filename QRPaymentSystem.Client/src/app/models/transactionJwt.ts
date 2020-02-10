export interface TransactionJwt {

    jti: string;
    iat: number;
    iss: string;

    sub?: string;
    aud?: string;
    amt?: number;
    cur?: string; // smth lke "RUB" | "USD" | "EUR" | "BLR"
    exp?: number;
    nbf?: number;
    qty?: number;
    // fiban: string;
    // tiban: string;
}
