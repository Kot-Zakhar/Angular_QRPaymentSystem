import { Injectable } from '@angular/core';
import { QrJwt } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { debug } from 'debug';

@Injectable({
  providedIn: 'root'
})
export class QrJwtService {
  private log = debug('app-qr-service');
  private jwtHelper = new JwtHelperService();

  constructor(
  ) { }

  parseQrJwtString(qrJwtString: string): QrJwt {
    try {
      const decodedToken = this.jwtHelper.decodeToken(qrJwtString) as QrJwt;
      this.log(decodedToken);
      return decodedToken;
    } catch (error) {
      this.log('Error: %s', error);
      return null;
    }
  }

}
