import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debug } from 'debug';
import { MoneyAccountViewModel } from 'src/app/models';
import { MoneyAccountService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-small-money-account-viewer',
  templateUrl: './small-money-account-viewer.component.html',
  styleUrls: ['./small-money-account-viewer.component.css']
})
export class SmallMoneyAccountViewerComponent implements OnInit {
  private log = debug('app-small-money-account-viewer-component');
  @Input() moneyAccount: MoneyAccountViewModel;
  name = new FormControl('', Validators.required);
  editing = false;

  constructor(
    private moneyAccountService: MoneyAccountService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

  }

  onNameEdit() {
    this.name.setValue(this.moneyAccount.name);
    this.editing = true;
  }

  onCancelEditing() {
    this.name.setValue('');
    this.editing = false;
  }

  onSaveName() {
    this.moneyAccountService.updateMoneyAccountName(this.moneyAccount.id, this.name.value)
      .subscribe(
        () => {
          this.moneyAccount.name = this.name.value;
          this.log(this.name.value);
          this.onCancelEditing();
        },
        () => {
          this.snackBar.open('Cannot save that name.', 'Ok', { duration: env.snackDurationInMs });
          this.onCancelEditing();
        }
      );
  }
}
