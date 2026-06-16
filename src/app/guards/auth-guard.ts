import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isAuth = localStorage.getItem('isAuth');

  if (isAuth === 'true') {
    return true;
  }

  router.navigate(['/login']);

  return false;
};