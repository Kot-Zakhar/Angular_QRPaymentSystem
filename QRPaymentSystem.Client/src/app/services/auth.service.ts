import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { User } from '../models/user';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private log = debug('app-auth-service');

  constructor(
    private oauthService: OAuthService,
  ) {
    this.currentUserSubject.subscribe(next => {
      this.log('User subject is updated:', next);
    },
    err => {
      this.log('Error in userSubject:', err);
    });

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(isLogged => {
        this.log('is logged: ', isLogged);
      });
  }

  tryGetProfile() {
    return this.oauthService.loadUserProfile().then(profile => {
      this.currentUserSubject.next(profile as User);
      return profile;
    });
  }

  tryLogin() {
    return this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(isLogged => {
        if (isLogged) {
          this.oauthService.loadUserProfile()
            .then(profile => {
              this.log('Got profile:', profile);
              this.currentUserSubject.next(profile as User);
            })
            .catch(err => {

            });
        }
        // else {
        //   if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
        //     this.oauthService.initImplicitFlow();
        //   }
        // }
        return isLogged;
      });
    // this.oauthService.tryLoginImplicitFlow()
    //   .then(isLogged => {
    //     this.log('Logged in:', isLogged);
    //     if (isLogged) {
    //       this.oauthService.loadUserProfile()
    //        .then(profile => {
    //          this.log('Got profile: ', profile);
    //          this.currentUserSubject.next(profile as User);
    //        });
    //     }
    //   });
  }

  isUserLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut(false);
  }

  // login(username: string, password: string): Observable<User> {
  //   this.log('login request.');
  //   return this.http.post<User>('api/auth/login', { username, password })
  //     .pipe(map(user => {
  //       this.log('login result: ', user);
  //       this.setCurrentUser(user);
  //       return user;
  //     }));
  // }

  // register(registerModel: RegisterModel): Observable<User> {
  //   this.log('registration request.');
  //   return this.http.post<User>('api/auth/register', registerModel)
  //     .pipe(map(user => {
  //       this.log('registration result: ', user);
  //       this.setCurrentUser(user);
  //       return user;
  //     }));
  // }

  // logout() {
  //   // remove user from local storage and set current user to null
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }
}
