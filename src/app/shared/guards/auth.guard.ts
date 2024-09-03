import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService: AuthService = inject(AuthService);
  let _platID: Object = inject(PLATFORM_ID);
  let _Router: Router = inject(Router);
  if (_AuthService.userData.getValue() != null) {
    return true;
  }
  return isPlatformServer(_platID) ? false : _Router.createUrlTree(['/login']);
};
