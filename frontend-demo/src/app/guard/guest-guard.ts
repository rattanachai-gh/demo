import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuth => {
      console.log('GuestGuard check: ', isAuth);
      if (isAuth==false) return true;

      return new RedirectCommand(
        router.parseUrl('/home'),
        {
          replaceUrl: true, // ไม่ให้ย้อนกลับมาหน้าเดิม
          state: { reason: 'not-auth' }
        }
      ); 
    })
  );
};