import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { debug } from 'debug';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment as env } from 'src/environments/environment';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private log = debug('app-login-component');
  loginForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.log(this.loginForm.value);

    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.log('login result: ', data);
          this.router.navigate(['/data']);
        },
        (error: HttpErrorResponse) => {
          this.log('login error: ', error);
          this.loading = false;
          this.snackBar.open(error.statusText, 'Ok', {
            duration: env.snackDurationInMs
          });
        }
      );
  }
}
