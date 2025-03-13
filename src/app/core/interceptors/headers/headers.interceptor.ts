import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('user token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Correctly formatting the token
        }
      });
    }
  }

  return next(req);
};

