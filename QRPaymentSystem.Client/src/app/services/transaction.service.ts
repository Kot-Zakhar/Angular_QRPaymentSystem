import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { Transaction } from '../models';
import { BehaviorSubject, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private localStoragePrefix = 'QrPaymentSystem';
  private log = debug('app-transaction-service');
  private _transactions: Transaction[] = [];
  private unfinishedTransactions: Transaction[] = [];
  latestScannedTransaction: BehaviorSubject<Transaction>;
  currentTransaction: BehaviorSubject<Transaction>;

  constructor(
  ) {
    this.currentTransaction = new BehaviorSubject<Transaction>(null);
    this.currentTransaction.subscribe({
      next: t => this.setTransaction(t)
    });
  }

  private setTransaction(transaction: Transaction): void {
    if (!transaction) {
      return;
    }
    // TODO: if this.transactionService.currentTransaction.value != null
    //         then say, that user has unfinished transaction
    //         and save that transaction in localStorage

  }

  // decodeTransaction

  // getById(id: string): Observer<Transaction> {

  // }

  // executeTransaction(transaction: Transaction): Observer<void> {

  // }

  // validateTransaction(transaction: Transaction): Observer<void> {

  // }


}
