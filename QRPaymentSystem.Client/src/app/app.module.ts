import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { AppComponent } from './app.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AuthInterceptorProvider } from './helpers/AuthInterceptor';
// import { ApiAuthorizationModule, apiAuthorizationInterceptorProviders } from './api-authorization';

import {
  NavigationComponent,
  QrScannerComponent,
  CallbackComponent,
  SmallMoneyAccountViewerComponent
} from './components';

import {
  HomeComponent,
  QrComponent,
  TransactionHistoryComponent,
  NotFoundComponent,
  TransactionViewerComponent,
  TransactionCreatorComponent,
  PaymentsComponent,
  MoneyAccountsComponent
} from './pages';

import {
  AuthService,
  TransactionService,
  MoneyAccountService
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
import { MoneyAccountIdMaskPipe } from './pipes/money-account-number-mask.pipe';
import { AuthGuard } from './helpers/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    // pages
    HomeComponent,
    QrComponent,
    TransactionHistoryComponent,
    NotFoundComponent,
    PaymentsComponent,
    // components
    NavigationComponent,
    QrScannerComponent,
    TransactionViewerComponent,
    TransactionCreatorComponent,
    MoneyAccountsComponent,
    SmallMoneyAccountViewerComponent,
    CallbackComponent,
    MoneyAccountIdMaskPipe,
  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    // ApiAuthorizationModule,
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
    AuthInterceptorProvider,
    AuthGuard,

    // services
    AuthService,
    TransactionService,
    MoneyAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
