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

  const users = JSON.parse(
    localStorage.getItem('users') || '[]'
  );

  const { email, password } = this.loginForm.value;

  const user = users.find(
    (u: any) =>
      u.email === email &&
      u.password === password
  );

  if (user) {

    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('currentUser', user.email);

    this.router.navigate(['/tasks']);

  } else {
    // alert() — убери везде
    // В login.ts и register.ts ты показываешь ошибки через alert(). Это браузерное всплывающее окно — так давно никто не делает. Заведи переменную errorMessage = '' в компоненте,
    //   записывай в неё текст ошибки, и выводи в шаблоне:
    //
    // @if (errorMessage) {
    //   <div class="alert alert-danger">{{ errorMessage }}</div>
    // }
    alert('Неверный email или пароль');
  }
}
}
