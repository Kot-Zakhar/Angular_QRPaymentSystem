import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor() { }

  validateQRPayload(): boolean {
    return true;
  }

  extractQRPayload() {
    
  }


}
