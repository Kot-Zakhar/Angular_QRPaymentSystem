import { QrJwtHeader } from 'src/app/models/qr-jwt-header';
import { QrJwtPayload } from 'src/app/models/qr-jwt-payload';

export class QrJwt {
    private token: string;

    constructor(qrJwtToken: string) {
        this.token = qrJwtToken;
    }

    public header: QrJwtHeader;
    public payload: QrJwtPayload;
    public signature: string;
}
