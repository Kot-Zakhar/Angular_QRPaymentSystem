import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {

    constructor(private oauthService: OAuthService) { }

    canActivate() {
        if (this.oauthService.hasValidAccessToken()) {
            return true;
        }

        this.oauthService.initImplicitFlow();
    }

    canActivateChild(
        childRoute: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot): boolean |
               import("@angular/router").UrlTree |
               import("rxjs").Observable<boolean |
                                         import("@angular/router").UrlTree> |
                                         Promise<boolean |
                                         import("@angular/router").UrlTree> {
        return this.canActivate();
    }
}
