import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RefreshMdwNeedRefresh } from './etc/need_refresh';
import { RefreshMdwMng } from './etc/mng';
import { inject } from '@angular/core';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { AuthSlice } from '@/features/auth/slice';
import { UseResetStateSvc } from '@/core/hooks/use_reset_state';

// const refreshMng = (err: HttpErrorResponse): Promise<HttpEvent<unknown>> => {};

export const refreshMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const http: HttpClient = inject(HttpClient);
  const useStorage: UseStorageSvc = inject(UseStorageSvc);
  const useNav: UseNavSvc = inject(UseNavSvc);
  const authSlice: AuthSlice = inject(AuthSlice);
  const useReset: UseResetStateSvc = inject(UseResetStateSvc);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!RefreshMdwNeedRefresh.main(err)) return throwError(() => err);

      return RefreshMdwMng.main(err, {
        http,
        useStorage,
        originalReq: req,
        next,
        authSlice,
        useNav,
        useReset,
      });
    })
  );
};
