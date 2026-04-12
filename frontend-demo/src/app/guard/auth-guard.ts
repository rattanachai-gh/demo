import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuth => {
      console.log('AuthGuard check: ', isAuth);
      if (isAuth) return true;

      return new RedirectCommand(
        router.parseUrl('/login'),
        {
          replaceUrl: true, // ไม่ให้ย้อนกลับมาหน้าเดิม
          state: { reason: 'not-auth' }
        }
      );  
    })
  );
};