import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);

  // ❌ استثناء روابط الشات وتحليل الصور من ظهور الـ Spinner
  const isExcluded = req.url.includes('51.21.124.246/chat') || req.url.includes('51.21.124.246/analyze');

  if (!isExcluded) {
    ngxSpinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!isExcluded) {
        setTimeout(() => {
          ngxSpinnerService.hide();
        }, 700);
      }
    })
  );
};
