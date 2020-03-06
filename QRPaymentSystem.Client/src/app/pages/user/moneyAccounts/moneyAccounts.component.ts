import { Component, OnInit } from '@angular/core';
import { debug } from 'debug';
import { HttpClient } from '@angular/common/http';
import { MoneyAccountViewModel } from 'src/app/models';
import { MoneyAccountService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';
import { environment as env } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-money-accounts',
  templateUrl: './moneyAccounts.component.html',
  styleUrls: ['./moneyAccounts.component.css']
})
export class MoneyAccountsComponent implements OnInit {
  private log = debug('app-moneyAccounts-component');
  moneyAccounts: MoneyAccountViewModel[];
  nameFormControl = new FormControl('', Validators.required);
  creating = false;

  constructor(
    private moneyAccountService: MoneyAccountService,
    private snackBar: MatSnackBar
  ) {
    this.moneyAccountService.moneyAccountsBehaviourSubject.subscribe(
      result => {
        this.moneyAccounts = result;
      },
      error => {
        this.log(error);
        this.snackBar.open('Cannot load your moneyAccounts.', 'Ok', { duration: env.snackDurationInMs });
      }
    );
  }

  ngOnInit() {
  }

  onCreateMoneyAccount() {
    this.creating = true;
    this.nameFormControl.setValue('');
  }

  onSubmitMoneyAccount() {
    this.moneyAccountService.createMoneyAccount(this.nameFormControl.value);
    this.onCancelCreation();
  }

  onCancelCreation() {

  }
}
