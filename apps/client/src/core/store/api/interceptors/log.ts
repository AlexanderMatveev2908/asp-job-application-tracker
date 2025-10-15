import { Log } from '@/core/lib/log';
import { envVars } from '@/environments/environment';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ConfApiSvc } from '../conf_api';
import { inject } from '@angular/core';
import { ApiShape, HttpResT } from '@/core/store/api/etc/api_shape';
import { ConfApiT } from '../etc/types';

const mng = (
  e: HttpEvent<unknown> | HttpErrorResponse,
  confData: Observable<ConfApiT | null>,
  emoji: string
): void => {
  if (!ApiShape.isHttpRes(e)) return;

  const baseURL: string = envVars.backURL;
  const res: HttpResT = e as HttpResT;

  let url: string = res.url ?? 'unknown url';
  url = url.replace(baseURL, '').split('?')[0];

  const content: Record<string, unknown> = res instanceof HttpErrorResponse ? res.error : res.body;

  confData.subscribe((conf: ConfApiT | null) => {
    Log.logTtl(`${emoji} ${url}`, conf, content);
  });
};

export const logApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: ConfApiSvc = inject(ConfApiSvc);
  const confData: Observable<ConfApiT | null> = confApi.obs();

  return next(req).pipe(
    tap({
      next: (res: HttpEvent<unknown>) => mng(res, confData, '✅'),
      error: (res: HttpErrorResponse) => mng(res, confData, '❌'),
    })
  );
};
