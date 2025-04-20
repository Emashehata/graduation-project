import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {register as registerSwiper} from 'swiper/element-bundle';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

registerSwiper();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  
registerLocaleData(localeAr);
