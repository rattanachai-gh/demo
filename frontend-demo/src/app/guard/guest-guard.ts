import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return  of(true);
  }
  return authService.checkAuth().pipe(
    map(isAuthenticated => {
      console.log('GuestGuard checkAuth result:', isAuthenticated);
      if (isAuthenticated===true) {
        console.log('GuestGuard: User is authenticated, redirecting to home');
        return router.createUrlTree(['/home']);
      }
      return true;
    })
  );
};