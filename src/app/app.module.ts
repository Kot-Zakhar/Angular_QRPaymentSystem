import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  TransactionViewerComponent
} from './pages';

import {
  LoginGuard,
  FakeBackendProvider
} from './helpers';

import {
  AuthService,
  QrJwtService,
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
  MatTableModule
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
  ],
  imports: [
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
    AppRoutingModule,
    MatTableModule
  ],
  providers: [
    // helpers
    LoginGuard,
    FakeBackendProvider,

    // services
    AuthService,
    QrJwtService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
