import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { debug } from 'debug';
import { ApiFormModel } from 'src/app/models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { environment as env } from 'src/environments/environment';
import { QRCodeComponent } from 'angularx-qrcode';
import * as FileSaver from 'file-saver';
import * as Clipboard from 'clipboard';


@Component({
  selector: 'app-transaction-creator',
  templateUrl: './transaction-creator.component.html',
  styleUrls: ['./transaction-creator.component.css']
})
export class TransactionCreatorComponent implements OnInit {
  @ViewChild('qrcode', { static: false }) qrCodeComponent: QRCodeComponent;

  private log = debug('app-transaction-creator');

  constructor(
    private formService: FormService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  loading = false;
  jwtResult = '';
  clipboardButton = new Clipboard('#copyButton', {
    text: () => {
      this.log('copying to clipboard.');
      return this.jwtResult;
    }
  });
  transactionFormModel: ApiFormModel;
  transactionFormGroup: FormGroup;

  ngOnInit() {
    this.formService.getNewTransferFormModel()
      .subscribe(
        form => {
          this.log(form);
          const group: any = {};
          form.fields.forEach(field => {
            group[field.key] = new FormControl('');
          });
          this.transactionFormGroup = new FormGroup(group);
          this.transactionFormModel = form;
        },
        error => {
          this.log(error);
        }
      );
  }

  onSubmit(formValue: any) {
    this.log(formValue);
    this.loading = true;
    this.formService.submitNewTransaferForm(formValue)
      .subscribe(
        result => {
          this.loading = false;
          this.jwtResult = result.jwtTransaction;
          this.log('submition result: ', this.jwtResult);
        },
        error => {
          this.log('submition error: ', error);
          this.loading = false;
          this.snackBar.open(error.message, 'Ok', {
            duration: env.snackDurationInMs
          });
        }
      );
  }

  onCopyToClipboard(e) {
    this.log(e);
    
  }

  onSaveImage() {
    let qrElementSrc = this.qrCodeComponent.qrcElement.nativeElement.children[0].src;
    FileSaver.saveAs(qrElementSrc, 'Transaction.png');
  }

}
