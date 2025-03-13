import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  if (authService.isLogin()) {
    // Redirect logged-in users to their respective home pages
    if (authService.isAdmin()) {
      router.navigate(['/homeAdmin']);
    } else {
      router.navigate(['/home']);
    }
    return false; // Prevent access to login/register
  }
  return true; // Allow access if not logged in


};
