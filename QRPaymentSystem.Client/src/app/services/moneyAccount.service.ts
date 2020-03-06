import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoneyAccountViewModel } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneyAccountService {
  private log = debug('app-moneyAccount-service');
  // private moneyAccounts: MoneyAccountViewModel[] = [];
  private defaultMoneyAccounts: MoneyAccountViewModel[] = [
    {
      name: '1st moneyAccount',
      id: '7d8a354a-a45d-4896-b3e8-fd50142bbfa4',
      amount: 10
    },
    {
      name: '2st moneyAccount',
      id: '2670ee44-6e75-495f-868d-4ea1603b38c8',
      amount: 100
    },
    {
      name: '3st moneyAccount',
      id: 'e3fd79dc-189c-43bb-8d73-43ffe413ac05',
      amount: 1
    }
  ];
  moneyAccountsBehaviourSubject = new BehaviorSubject<MoneyAccountViewModel[]>(null);

  constructor(
    private http: HttpClient
  ) {
    this.http.get<MoneyAccountViewModel[]>('/api/moneyAccount').subscribe(
      moneyAccounts => {
        this.moneyAccountsBehaviourSubject.next(moneyAccounts);
      },
      error => {
        this.log(error);
        this.moneyAccountsBehaviourSubject.error(error);
        this.moneyAccountsBehaviourSubject.next([]);
      }
    );
  }

  updateMoneyAccountName(id: string, name: string) {
    this.log('Updating name to \'' + name + '\' of money account \'' + id + '\'');
    return this.http.put('/api/moneyAccount/' + id, { name });
  }

  createMoneyAccount(name: string) {
    this.http.post<MoneyAccountViewModel>('/api/moneyAccount', { name }).subscribe(
      moneyAccount => {
        this.moneyAccountsBehaviourSubject.value.push(moneyAccount);
      }
    );
    // let moneyAccount = new MoneyAccountViewModel();
    // moneyAccount.amount = 0;
    // moneyAccount.name = name;
    // moneyAccount.id = "asdf-sdf3er-234879-asd";
    // this.moneyAccountsBehaviourSubject.value.push(moneyAccount);
  }

}
