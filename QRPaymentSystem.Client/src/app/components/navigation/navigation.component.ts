import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { routes as navigationRoutes } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentUser: any;
  routes = navigationRoutes;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUserObservable.subscribe(u => this.currentUser = u);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['.']);
  }

  ngOnInit() {
  }
}
