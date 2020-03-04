import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetViewModel } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private log = debug('app-asset-service');
  // private assets: AssetViewModel[] = [];
  private defaultAssets: AssetViewModel[] = [
    {
      name: '1st asset',
      id: '7d8a354a-a45d-4896-b3e8-fd50142bbfa4',
      amount: 10
    },
    {
      name: '2st asset',
      id: '2670ee44-6e75-495f-868d-4ea1603b38c8',
      amount: 100
    },
    {
      name: '3st asset',
      id: 'e3fd79dc-189c-43bb-8d73-43ffe413ac05',
      amount: 1
    }
  ];
  assetsBehaviourSubject = new BehaviorSubject<AssetViewModel[]>(null);

  constructor(
    private http: HttpClient
  ) {
    this.http.get<AssetViewModel[]>('/api/asset').subscribe(
      assets => {
        this.assetsBehaviourSubject.next(assets);
      },
      error => {
        this.log(error);
        this.assetsBehaviourSubject.error(error);
        this.assetsBehaviourSubject.next([]);
      }
    );
  }

  updateAssetName(id: string, name: string) {
    this.log('Updating name to \'' + name + '\' of asset \'' + id + '\'');
    return this.http.put('/api/asset/' + id, { name });
  }

  createAsset(name: string) {
    // this.http.post<AssetViewModel>('/api/asset', { name }).subscribe(
    //   asset => {
    //     this.assetsBehaviourSubject.value.push(asset);
    //   }
    // )
    let asset = new AssetViewModel();
    asset.amount = 0;
    asset.name = name;
    asset.id = "asdf-sdf3er-234879-asd";
    this.assetsBehaviourSubject.value.push(asset);
  }

}
