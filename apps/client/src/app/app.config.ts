import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { rootReducer } from '../core/store';
import { baseApiMdw } from '@/core/store/api/interceptors/base';
import { logApiMdw } from '@/core/store/api/interceptors/log';
import { addConfApiMdw } from '@/core/store/api/interceptors/with_conf';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore(rootReducer),
    provideHttpClient(withFetch(), withInterceptors([baseApiMdw, logApiMdw, addConfApiMdw])),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
