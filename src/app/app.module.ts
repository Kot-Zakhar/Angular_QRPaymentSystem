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
  MyQrsComponent,
  NotFoundComponent
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
    // pages
    HomeComponent,
    LoginComponent,
    DataComponent,
    QrComponent,
    MyQrsComponent,
    NotFoundComponent,
    // components
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
          { path: 'scan', component: QrComponent },
          { path: 'myqrs', component: MyQrsComponent },
        ]
      },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'not-found/:notFoundPath', component: NotFoundComponent },
      { path: ':notFoundPath', redirectTo: 'not-found/:notFoundPath' }
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
