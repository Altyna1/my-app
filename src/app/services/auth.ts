import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(user: any): string | null {

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const userExists = users.some(
      (u: any) => u.email === user.email
    );

    if (userExists) {
      return 'Пользователь с таким email уже существует';
    }

    users.push(user);

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    return null;
  }

  login(email: string, password: string): boolean {

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('currentUser', user.email);

    return true;
  }

  logout(): void {

    localStorage.removeItem('isAuth');
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {

    return localStorage.getItem('isAuth') === 'true';
  }
}
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
