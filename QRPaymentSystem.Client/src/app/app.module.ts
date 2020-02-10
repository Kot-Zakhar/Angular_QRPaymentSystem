import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';

import {
  NavigationComponent,
  QrScannerComponent
} from './components';

import {
  HomeComponent,
  LoginComponent,
  DataComponent,
  QrComponent,
  MyTransactionsComponent,
  NotFoundComponent,
  TransactionViewerComponent,
  RegisterComponent,
  TransactionCreatorComponent
} from './pages';

import {
  LoginGuard,
} from './helpers';

import {
  interceptorProviders
} from './interceptors';

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
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // pages
    HomeComponent,
    LoginComponent,
    DataComponent,
    QrComponent,
    MyTransactionsComponent,
    NotFoundComponent,
    // components
    NavigationComponent,
    QrScannerComponent,
    TransactionViewerComponent,
    RegisterComponent,
    TransactionCreatorComponent,
  ],
  imports: [
    AppRoutingModule,
    QRCodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatProgressSpinnerModule
  ],
  providers: [
    // helpers
    LoginGuard,
    interceptorProviders,

    // services
    AuthService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
