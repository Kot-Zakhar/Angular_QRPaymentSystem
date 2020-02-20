import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { AppComponent } from './app.component';
import { ApiAuthorizationModule, apiAuthorizationInterceptorProviders } from './api-authorization';

import {
  NavigationComponent,
  QrScannerComponent
} from './components';

import {
  HomeComponent,
  LoginComponent,
  QrComponent,
  TransactionHistoryComponent,
  NotFoundComponent,
  TransactionViewerComponent,
  RegisterComponent,
  TransactionCreatorComponent,
  PaymentsComponent
} from './pages';

import {
  AuthService,
  TransactionService
} from './services';

import {
  MatSliderModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AssetsComponent } from './pages/user/assets/assets.component';
import { SmallAssetViewerComponent } from './components/small-asset-viewer/small-asset-viewer.component';
import { AssetIdMaskPipe } from './pipes/asset-number-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // pages
    HomeComponent,
    LoginComponent,
    QrComponent,
    TransactionHistoryComponent,
    NotFoundComponent,
    PaymentsComponent,
    // components
    NavigationComponent,
    QrScannerComponent,
    TransactionViewerComponent,
    RegisterComponent,
    TransactionCreatorComponent,
    AssetsComponent,
    SmallAssetViewerComponent,
    AssetIdMaskPipe,
  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiAuthorizationModule,
    AppRoutingModule,

    ReactiveFormsModule,
    FormsModule,

    // material modules
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [
    apiAuthorizationInterceptorProviders,

    // services
    AuthService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
