import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
            <mat-form-field class="full-width">
              <mat-label>Email</mat-label>
              <input matInput name="email" ngModel required email>
              <mat-error>Valid email is required</mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" name="password" ngModel required minlength="6">
              <mat-error>Min 6 characters</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
              Login
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; margin-top: 50px; }
    .login-card { width: 400px; }
    .full-width { width: 100%; margin-bottom: 10px; }
  `]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Login data:', form.value);
      this.authService.login();
      this.router.navigate(['/events']);
    }
  }
}