import { Component, OnInit } from '@angular/core';
import { debug } from 'debug';
import { HttpClient } from '@angular/common/http';
import { AssetViewModel } from 'src/app/models';
import { AssetService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';
import { environment as env } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  private log = debug('app-assets-component');
  assets: AssetViewModel[];
  nameFormControl = new FormControl('', Validators.required);
  creating = false;

  constructor(
    private assetService: AssetService,
    private snackBar: MatSnackBar
  ) {
    this.assetService.assetsBehaviourSubject.subscribe(
      result => {
        this.assets = result;
      },
      error => {
        this.log(error);
        this.snackBar.open('Cannot load your assets.', 'Ok', { duration: env.snackDurationInMs });
      }
    );
  }

  ngOnInit() {
  }

  onCreateAsset() {
    this.creating = true;
    this.nameFormControl.setValue('');
  }

  onSubmitAsset() {
    this.assetService.createAsset(this.nameFormControl.value);
    this.onCancelCreation();
  }

  onCancelCreation() {

  }
}
