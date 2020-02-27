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
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

      this.oauthService.configure(authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      // this.oauthService.loadDiscoveryDocument()
      this.oauthService.loadDiscoveryDocumentAndTryLogin()
        .then(value => {
          this.log('OnInit: loadDiscoveryDocumentAndTryLogin: ', value);
          if (value) {
            this.oauthService.loadUserProfile()
              .then(profile => {
                this.log('Got profile: ', profile);
                this.currentUserSubject.next(profile as User);
              });
          }
        })
        .catch(err => { this.log('OnInit: loadDiscoveryDocumentAndTryLogin.error:', err); });
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
