import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { routes as navigationRoutes } from 'src/environments/environment';
import { debug } from 'debug';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  currentUser: any;
  routes = navigationRoutes;
  private log = debug('app-auth-service');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUserSubject.subscribe(u => this.currentUser = u);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['.']);
  }

  login() {
    this.authService.login();
  }
}
