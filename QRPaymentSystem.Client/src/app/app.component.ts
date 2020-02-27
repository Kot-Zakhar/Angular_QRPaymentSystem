import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { authConfig } from 'src/environments/environment';
import { debug } from 'debug';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private log = debug('app-root-component');
  title = 'qrPaymentSystemApp';
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
