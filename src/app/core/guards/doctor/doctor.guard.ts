import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

export const doctorGuard: CanActivateFn = (route, state) => {
    let authService: AuthService = inject(AuthService);
    let router: Router = inject(Router);
    let toastrService:ToastrService=inject(ToastrService);

    if (authService.isDoctor()) {
      return true; // Allow access if the user is an admin
    } else {
      toastrService.error('ليس لديك الصلاحية للوصول إلى هذه الصفحة');
      router.navigate(['/home']); // Redirect to home if not doctor
      return false;
    }
};
