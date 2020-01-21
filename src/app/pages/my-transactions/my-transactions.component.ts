import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services';
import { Transaction } from 'src/app/models';
import { debug } from 'debug';
import { routes, environment as env } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css']
})
export class MyTransactionsComponent implements OnInit {
  private log = debug('app-transaction-service');
  transactionViewerPath = routes.transactionViewer;
  transactions: Transaction[];
  displayedColumns: string[] = [
    'index',
    'creationDate',
    // 'creator',
    // 'from',
    // 'to',
    'amount',
    'notBeforeDate',
    'expirationDate',
    'completed',
    'update',
    'more',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private transactionService: TransactionService
  ) {
    this.transactions = this.transactionService.transactions;
    this.log('constructor:', this.transactions);
  }

  ngOnInit() {
  }

  onTransactionUpdate(transaction: Transaction) {
    let message: string;
    if (this.transactionService.updateTransactionInfo(transaction.id)) {
      message = 'Transaction updated successfully.';
    } else {
      message = 'Transaction updated failed.';
    }
    this.snackBar.open(message, 'Ok', {
      duration: env.snackDurationInMs
    });
  }

}
