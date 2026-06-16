import { Component } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      alert('Пользователь не найден');
      return;
    }

    const user = JSON.parse(savedUser);

    const { email, password } = this.loginForm.value;

    if (user.email === email && user.password === password) {

      localStorage.setItem('isAuth', 'true');

      this.router.navigate(['/tasks']);

    } else {
      alert('Неверный email или пароль');
    }
  }
}