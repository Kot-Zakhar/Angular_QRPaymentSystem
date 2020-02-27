import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { debug } from 'debug';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { RegisterationViewModel } from 'src/app/models/viewModels/registerationViewModel';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private log = debug('app-register-component');
  registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.log(this.registerForm.value);

    // this.authService.register(this.registerForm.value as RegisterationViewModel)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.log('registration result: ', data);
    //       this.router.navigate(['/data']);
    //     },
    //     (error: HttpErrorResponse) => {
    //       this.log('registration error: ', error);
    //       this.loading = false;
    //       this.snackBar.open(error.statusText, 'Ok', {
    //         duration: env.snackDurationInMs
    //       });
    //     }
    //   );
    // this.authService.login(this.registerForm.controls.username.value, this.registerForm.controls.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.log('login result: ', data);
    //       this.router.navigate(['/data']);
    //     },
    //     (error: HttpErrorResponse) => {
    //     }
    //   );
  }
}
