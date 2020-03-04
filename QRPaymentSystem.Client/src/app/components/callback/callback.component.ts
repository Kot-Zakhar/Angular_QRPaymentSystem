import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { debug } from 'debug';
import { AuthService } from 'src/app/services';

@Component({
  template: '',
})
export class CallbackComponent implements OnInit {
  private log = debug('app-callback-component');

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.tryLogin().then(_ => {
      this.router.navigate(['home']);
    });
    // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
    //   if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
    //     this.oauthService.initImplicitFlow();
    //   } else {
    //     this.router.navigate(['home']);
    //   }
    // });
  }

}
