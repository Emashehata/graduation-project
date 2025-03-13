import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
// import { provideExperimentalFeatures } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withInMemoryScrolling({
      scrollPositionRestoration:"top",}),
    withHashLocation(),
    withViewTransitions() ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor])),
    provideToastr(),
    // provideExperimentalFeatures()

  ]
};
