import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debug } from 'debug';
import { AssetViewModel } from 'src/app/models';
import { AssetService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-small-asset-viewer',
  templateUrl: './small-asset-viewer.component.html',
  styleUrls: ['./small-asset-viewer.component.css']
})
export class SmallAssetViewerComponent implements OnInit {
  private log = debug('app-small-asset-viewer-component');
  @Input() asset: AssetViewModel;
  name = new FormControl('', Validators.required);
  editing = false;

  constructor(
    private assetService: AssetService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

  }

  onNameEdit() {
    this.name.setValue(this.asset.name);
    this.editing = true;
  }

  onCancelEditing() {
    this.name.setValue('');
    this.editing = false;
  }

  onSaveName() {
    this.assetService.updateAssetName(this.asset.id, this.name.value)
      .subscribe(
        () => {
          this.asset.name = this.name.value;
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
