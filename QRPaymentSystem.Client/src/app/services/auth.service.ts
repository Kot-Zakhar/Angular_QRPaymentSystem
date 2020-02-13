import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { debug } from 'debug';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { RegisterationViewModel as RegisterModel } from '../models/viewModels/registerationViewModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUserObservable: Observable<any>;
  private log = debug('app-auth-service');

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  private setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get accessToken(): string {
    return this.currentUserSubject.value.accessToken;
  }

  isUserLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  register(registerModel: RegisterModel): Observable<User> {
    this.log('registration request.');
    return this.http.post<User>('api/auth/register', registerModel)
      .pipe(map(user => {
        this.log('registration result: ', user);
        this.setCurrentUser(user);
        return user;
      }));
  }

  login(username: string, password: string): Observable<User> {
    this.log('login request.');
    return this.http.post<User>('api/auth/login', { username, password })
      .pipe(map(user => {
        this.log('login result: ', user);
        this.setCurrentUser(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
