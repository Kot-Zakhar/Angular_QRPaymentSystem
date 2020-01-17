import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {
  NavigationComponent,
  QrScannerComponent,
  QrViewerComponent
} from './components';

import {
  HomeComponent,
  LoginComponent,
  DataComponent,
  QrComponent,
} from './pages';

import {
  LoginGuard,
  FakeBackendProvider
} from './helpers';

import {
  AuthService
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
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DataComponent,
    QrComponent,
    NavigationComponent,
    QrScannerComponent,
    QrViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,

    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '',
        canActivateChild: [LoginGuard],
        children: [
          { path: 'data', component: DataComponent },
          { path: 'qr', component: QrComponent }
        ]
      },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    LoginGuard,
    FakeBackendProvider,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
