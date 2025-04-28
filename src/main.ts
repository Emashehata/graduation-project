import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {register as registerSwiper} from 'swiper/element-bundle';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { provideCharts } from 'ng2-charts';

// registerSwiper();

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

  
// registerLocaleData(localeAr);


registerSwiper();

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideCharts(), // 🔥 توفير charts مع البروڤايدرز
    ...(appConfig.providers || [])
  ]
})
  .catch((err) => console.error(err));

registerLocaleData(localeAr);