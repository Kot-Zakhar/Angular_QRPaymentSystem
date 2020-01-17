import { Injectable } from '@angular/core';
import { QrJwt } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor() { }

  validateQrJwtString(): boolean {
    return true;
  }

  parseQrJwt(): QrJwt {

  }

  storeQRJwt(token: string): boolean {

  }


}
