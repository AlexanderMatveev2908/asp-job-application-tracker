/* eslint-disable @typescript-eslint/no-explicit-any */
import { Log } from '@/core/lib/log';
import { envVars } from '@/environments/environment';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ConfApiSvc } from '../conf_api';
import { inject } from '@angular/core';

export const logApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: ConfApiSvc = inject(ConfApiSvc);
  const baseURL: string = envVars.backURL;

  return next(req).pipe(
    map((e: HttpEvent<unknown>) => {
      if (!(e instanceof HttpResponse)) return e;

      let url: string = e.url ?? 'unknown url';
      url = url.replace(baseURL, '').split('?')[0];

      // eslint-disable-next-line no-magic-numbers
      const isSuccess: boolean = e.status >= 200 && e.status < 300;
      const emoji: string = isSuccess ? '✅' : '❌';

      Log.logTtl(`${emoji} ${url}`, confApi.get(), e.body);

      return e;
    }),
    catchError((err: any) => {
      throw err;
    })
  );
};
