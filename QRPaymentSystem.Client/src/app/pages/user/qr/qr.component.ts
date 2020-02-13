import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { TransactionJwt, Transaction } from 'src/app/models';
import { TransactionService } from 'src/app/services';
import { routes, environment as env } from 'src/environments/environment';
import { debug } from 'debug';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  scannerNotAvailable = false;
  transactionJwt: TransactionJwt;
  transaction: Transaction;
  rawJwt = '';
  private log = debug('app-qr-component');

  constructor(
    private snackBar: MatSnackBar,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {}

  onScanned(jwtString: string) {
    this.log(jwtString);

    // this.transactionJwt = this.transactionJwtService.parseQrJwtString(jwtString);
    this.snackBar.open('To be implemented.', 'OK', {
      duration: env.snackDurationInMs
    });
    return;
    if (this.transactionJwt) {
      this.transaction = new Transaction(this.transactionJwt, jwtString);
      this.transactionService.currentTransaction.next(this.transaction);
      this.router.navigate([routes.transactionViewer, this.transaction.id]);
    } else {
      this.snackBar.open('Invalid code.', 'Dismiss', {
        duration: env.snackDurationInMs
      });
      this.transactionService.currentTransaction.next(null);
    }
  }

  onVideoDeviceNotFound() {
    this.scannerNotAvailable = true;
  }
}
