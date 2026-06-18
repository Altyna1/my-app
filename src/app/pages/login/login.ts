import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;

  errorMessage = '';
  constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    onSubmit() {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const success = this.authService.login(
      email,
      password
    );

    if (success) {

      this.router.navigate(['/tasks']);

    } else {

      this.errorMessage = 'Неверный email или пароль';
    }
  }
}