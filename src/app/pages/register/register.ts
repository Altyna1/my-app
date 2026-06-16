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
    alert('Пользователь с таким email уже существует');
    return;
  }

  users.push(this.registerForm.value);

  localStorage.setItem(
    'users',
    JSON.stringify(users)
  );

  alert('Регистрация успешна!');

  this.registerForm.reset();
}
}