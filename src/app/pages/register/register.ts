import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

  if (this.registerForm.invalid) {
    return;
  }

  const users = JSON.parse(
    localStorage.getItem('users') || '[]'
  );

  const userExists = users.some(
    (user: any) =>
      user.email === this.registerForm.value.email
  );

  if (userExists) {
    // alert() — убери везде
    // В login.ts и register.ts ты показываешь ошибки через alert(). Это браузерное всплывающее окно — так давно никто не делает. Заведи переменную errorMessage = '' в компоненте,
    //   записывай в неё текст ошибки, и выводи в шаблоне:
    //
    // @if (errorMessage) {
    //   <div class="alert alert-danger">{{ errorMessage }}</div>
    // }
    alert('Пользователь с таким email уже существует');
    return;
  }

  users.push(this.registerForm.value);

  localStorage.setItem(
    'users',
    JSON.stringify(users)
  );
    // alert() — убери везде
    // В login.ts и register.ts ты показываешь ошибки через alert(). Это браузерное всплывающее окно — так давно никто не делает. Заведи переменную errorMessage = '' в компоненте,
    //   записывай в неё текст ошибки, и выводи в шаблоне:
    //
    // @if (errorMessage) {
    //   <div class="alert alert-danger">{{ errorMessage }}</div>
    // }
  alert('Регистрация успешна!');

  this.registerForm.reset();
}
}

// pages/register/register.ts — после регистрации ничего не происходит
//
// После успешной регистрации у тебя:
//
//   alert('Регистрация успешна!');
// this.registerForm.reset();
//
// Пользователь видит алерт, жмёт ОК — и остаётся на той же странице. Он не знает, что делать дальше. Нужно сделать редирект на страницу входа:
//
//   this.router.navigate(['/login']);
//
// Не забудь внедрить Router через конструктор.
