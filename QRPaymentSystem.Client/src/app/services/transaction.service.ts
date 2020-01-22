import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { Transaction } from '../models';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { QrJwtService } from './qr.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private localStoragePrefix = 'QrPaymentSystem';
  private log = debug('app-transaction-service');
  private _transactions: Transaction[] = [];
  latestScannedTransaction: BehaviorSubject<Transaction>;

  constructor(
    private qrJwtService: QrJwtService
  ) {
    this.latestScannedTransaction = new BehaviorSubject<Transaction>(null);
    this.latestScannedTransaction.subscribe({
      next: t => this.addTransaction(t)
    });
    this.restoreTransactions();
  }

  private addTransaction(transaction: Transaction): void {
    if (!transaction) {
      return;
    }
    const transactionAlreadySaved = this._transactions.find(t => t.id === transaction.id);
    if (!transactionAlreadySaved) {
      this._transactions.push(transaction);
      this.saveTransactions();
    }
    this.log('Current list of transactions: ', this._transactions);
  }

  private saveTransactions(): void {
    localStorage.setItem(this.localStoragePrefix + ':transactionsAmount', this._transactions.length.toString());
    this._transactions.forEach((transaction, index) => {
      localStorage.setItem(this.localStoragePrefix + ':transaction_' + index, transaction.rawToken);
    });
  }

  private restoreTransactions(): void {
    const stringAmount = localStorage.getItem(this.localStoragePrefix + ':transactionsAmount');
    this._transactions = [];
    if (!isNullOrUndefined(stringAmount)){
      const amount = parseInt(stringAmount);
      for (let i = 0; i < amount; i++){
        const transactionRawToken = localStorage.getItem(this.localStoragePrefix + ':transaction_' + i);
        try {
          if (transactionRawToken) {
            this._transactions.push(new Transaction(
              this.qrJwtService.parseQrJwtString(transactionRawToken),
              transactionRawToken
            ));
          }
        } catch (err) {
          this.log('restoring ' + i + 'token:', err);
        }
      }
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  getById(id: string): Transaction {
    return this._transactions.find(t => t.id === id);
  }

  executeTransaction(transactionId: string): boolean {
    const transaction = this.getById(transactionId);
    if (transaction) {
      transaction.completed = true;
    }
    return transaction.completed;
  }

  validateTransaction(transactionId: string): boolean {
    const transaction = this.getById(transactionId);
    if (transaction) {
      transaction.validated = true;
    }
    return transaction.validated;
  }

  updateTransactionInfo(transactionId: string): boolean {
    this.validateTransaction(transactionId);
    return true;
  }

}
