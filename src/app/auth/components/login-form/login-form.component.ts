import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { IResponse, LOCALSTORAGE } from 'src/core/interfaces/response';
import { UserDataService } from 'src/app/main/profile/services/user-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  logInForm!: FormGroup;

  hide = true;

  location!: Location;

  message: string | null = null;

  subscription!: Subscription;

  onSubmit() {
    this.message = null;
    if (this.logInForm.status !== 'VALID') return;

    this.subscription = this.authService
      .login()
      .subscribe((res: IResponse[]) => {
        if (
          res[0].login !== this.logInForm.controls['login'].value ||
          res[0].password !== this.logInForm.controls['password'].value
        )
          this.message = 'Incorrectly login or password';
        else {
          localStorage.setItem(
            LOCALSTORAGE.KEY,
            `${res[0].firstName}-${res[0].lastName}`
          );

          this.authService.authToken = `${res[0].firstName}-${res[0].lastName}`;
          setTimeout(() => {
            this.router.navigate(['/home']);
          });
        }
      });
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.logInForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
