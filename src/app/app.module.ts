import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DataComponent } from './components/data/data.component';

import { LoginGuard } from './helpers/loginGuard';
import { FakeBackendProvider } from './helpers/fake-backend.helper';
import { AuthService } from './services/auth.service';

import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatSliderModule,

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
