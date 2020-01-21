import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models';
import { TransactionService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-viewer',
  templateUrl: './transaction-viewer.component.html',
  styleUrls: ['./transaction-viewer.component.css']
})
export class TransactionViewerComponent implements OnInit {
  @Input()
  transaction: Transaction;
  transactionId: string;

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
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
    this.transaction = null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.transactionId = params.get('mytransactionId');
      this.transaction = this.transactionService.getById(this.transactionId); //if id is null, than transaction will be undefined
    });
  }
}
