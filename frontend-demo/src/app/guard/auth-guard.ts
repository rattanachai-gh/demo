
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject, PLATFORM_ID } from '@angular/core';
import { map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return  of(true); // Server-side rendering: redirect to login
  }
  return authService.checkAuth().pipe(
    map(isAuthenticated => {
      console.log('AuthGuard checkAuth result:', isAuthenticated);
      if (!isAuthenticated) {
        console.log('AuthGuard: User is not authenticated, redirecting to login');
        return router.createUrlTree(['/login']);
      }
      return true;
    })
  );
};