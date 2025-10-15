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
import { ApiShape } from '@/core/store/api/etc/api_shape';

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

      const emoji: string = ApiShape.emojiByStatus(e.status);

      Log.logTtl(`${emoji} ${url}`, confApi.get(), e.body);

      return e;
    }),
    catchError((err: any) => {
      throw err;
    })
  );
};
