import { Service } from '@angular/core';

@Service()
export class Auth {}
// services/auth.ts — сервис не работает

// В Angular нет ни Service, ни декоратора @Service(). Это просто не существует. Правильно вот так:
//
//   import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {}
//
// И сам сервис пустой — методов нет никаких. Логика входа и регистрации у тебя написана прямо внутри компонентов login.ts и register.ts. Так делать не нужно. Компонент отвечает
// за отображение, а не за бизнес-логику. Вынеси в сервис методы login(), register(), logout() и используй их из компонентов.
