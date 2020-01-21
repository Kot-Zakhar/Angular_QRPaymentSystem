import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Transaction } from 'src/app/models';
import { TransactionService } from 'src/app/services';
import { routes, environment as env } from 'src/environments/environment';
import { debug } from 'debug';

@Component({
  selector: 'app-transaction-viewer',
  templateUrl: './transaction-viewer.component.html',
  styleUrls: ['./transaction-viewer.component.css']
})
export class TransactionViewerComponent implements OnInit {
  @Input()
  transaction: Transaction;
  transactionId: string;
  returnPath = routes.mytransactions;
  private log = debug('app-transaction-viewer');

  fieldsToView = [
    {
      key: 'from',
      placeholder: 'From',
      type: 'id'
    },
    {
      key: 'fromIban',
      placeholder: 'From IBAN',
      type: 'number'
    },
    {
      key: 'to',
      placeholder: 'To',
      type: 'id'
    },
    {
      key: 'toIban',
      placeholder: 'To IBAN',
      type: 'number'
    },
    {
      key: 'amount',
      placeholder: 'Amount',
      type: 'number'
    },
    {
      key: 'currency',
      placeholder: 'Currency',
      type: 'number'
    },
    {
      key: 'creatorId',
      placeholder: 'Creator',
      type: 'id'
    },
    {
      key: 'creationDate',
      placeholder: 'Creation date',
      type: 'date'
    },
    {
      key: 'notBeforeDate',
      placeholder: 'Available from',
      type: 'date'
    },
    {
      key: 'expirationDate',
      placeholder: 'Available till',
      type: 'date'
    },
    {
      key: 'quantity',
      placeholder: 'Quantity',
      type: 'number'
    }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transaction = null;
    this.log('constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.transactionId = params.get('mytransactionId');
      this.transaction = this.transactionService.getById(this.transactionId); //if id is null, than transaction will be undefined
      if (!this.transaction) {
        // this.router.navigate(['/', routes.notfound], { queryParams: { transactionId:  this.transactionId } });
        this.router.navigate(['/', routes.home]);
      } else {
        this.log(this.transaction);
      }
    });
  }

  onComplete(transaction: Transaction) {
    let message: string;
    if (this.transactionService.executeTransaction(transaction.id)) {
      message = 'Transaction executed successfully.';
    } else {
      message = 'Transaction execution failed.';
    }
    this.snackBar.open(message, 'Ok', {
      duration: env.snackDurationInMs
    });
  }
}
