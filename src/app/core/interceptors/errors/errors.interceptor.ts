import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService=inject(ToastrService)
  return next(req).pipe(catchError((err)=>{

      toastrService.error(err.error.message);
      return throwError(()=>err);
  }));
};
