import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { authConfig } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qrPaymentSystemApp';
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private oauthService: OAuthService
  ) {
    if (isPlatformBrowser(platformId)) {
      this.oauthService.configure(authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
        if (
          !this.oauthService.hasValidIdToken() ||
          !this.oauthService.hasValidAccessToken()
        ) {
          this.oauthService.initImplicitFlow('some-state');
        }
      });
    }
  }
}
