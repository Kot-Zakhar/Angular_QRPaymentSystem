import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { QrJwt, Transaction } from 'src/app/models';
import { QrJwtService, TransactionService } from 'src/app/services';
import { routes, environment as env } from 'src/environments/environment';
import { debug } from 'debug';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  qrJwt: QrJwt;
  transaction: Transaction;
  private log = debug('app-qr-component');

  constructor(
    private snackBar: MatSnackBar,
    private qrJwtService: QrJwtService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {}

  onScanned(jwtString: string) {
    this.log(jwtString);

    this.qrJwt = this.qrJwtService.parseQrJwtString(jwtString);
    if (this.qrJwt) {
      this.transaction = new Transaction(this.qrJwt, jwtString);
      this.transactionService.latestScannedTransaction.next(this.transaction);
      this.router.navigate([routes.transactionViewer, this.transaction.id]);
    } else {
      this.snackBar.open('Invalid QR code.', 'Dismiss', {
        duration: env.snackDurationInMs
      });
      this.transactionService.latestScannedTransaction.next(null);
    }
  }
}
