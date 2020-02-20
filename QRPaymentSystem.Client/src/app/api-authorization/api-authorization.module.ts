import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { AuthorizationPaths } from './api-authorization.constants';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(
      [
        { path: AuthorizationPaths.Register, component: LoginComponent },
        { path: AuthorizationPaths.Profile, component: LoginComponent },
        { path: AuthorizationPaths.Login, component: LoginComponent },
        { path: AuthorizationPaths.LoginFailed, component: LoginComponent },
        { path: AuthorizationPaths.LoginCallback, component: LoginComponent },
        { path: AuthorizationPaths.LogOut, component: LogoutComponent },
        { path: AuthorizationPaths.LoggedOut, component: LogoutComponent },
        { path: AuthorizationPaths.LogOutCallback, component: LogoutComponent }
      ]
    ),
    MatButtonModule
  ],
  declarations: [LoginMenuComponent, LoginComponent, LogoutComponent],
  exports: [LoginMenuComponent, LoginComponent, LogoutComponent]
})
export class ApiAuthorizationModule { }
