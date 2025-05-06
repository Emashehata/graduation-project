import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
    let authService: AuthService = inject(AuthService);
    let router: Router = inject(Router);
    let toastrService:ToastrService=inject(ToastrService);

    if (authService.isUser()) {
      return true; // Allow access if the user is an user
    }
    if (authService.isAdmin()||authService.isDoctor()) {
      toastrService.error('ليس لديك صلاحية الدخول إلي هذه الصفحة');
      return false;
    }
    else  {
      toastrService.error('يجب تسجيل الدخول للحجز');
      router.navigate(['/login']); // Redirect to login if not User
      return false;
    }
};
