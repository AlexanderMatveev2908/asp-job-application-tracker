import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { ErrApiT, ResApiT } from '../../../etc/types';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { RefreshMdwConst } from './constants';
import { JwtResT } from '@/features/auth/etc/types';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { Log } from '@/core/lib/dev/log';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { AuthSlice } from '@/features/auth/slice';

export interface RefreshMngArgT {
  http: HttpClient;
  useStorage: UseStorageSvc;
  originalReq: HttpRequest<unknown>;
  next: HttpHandlerFn;
  useNav: UseNavSvc;
  authSlice: AuthSlice;
}

export class RefreshMdwMng {
  private static refresh(
    _: HttpErrorResponse,
    { http, useStorage, authSlice }: Pick<RefreshMngArgT, 'http' | 'useStorage' | 'authSlice'>
  ): Observable<string> {
    return http
      .get<ResApiT<JwtResT>>(RefreshMdwConst.ENDPOINT_REFRESH, { withCredentials: true })
      .pipe(
        switchMap((res: ResApiT<JwtResT>) => {
          const freshJwt: string = res.accessToken;

          useStorage.setItem('accessToken', freshJwt);
          if (!authSlice.isLogged()) authSlice.login();

          return of(freshJwt);
        }),
        catchError((err: ErrApiT<void>) => {
          authSlice.logout();

          return throwError(() => err);
        })
      );
  }

  public static main(
    err: HttpErrorResponse,
    { http, useStorage, originalReq, next, authSlice, useNav }: RefreshMngArgT
  ): Observable<HttpEvent<unknown>> {
    return this.refresh(err, { http, useStorage, authSlice }).pipe(
      switchMap((freshJwt: string) => {
        Log.logTtl('✅ refresh ok');

        const retryRequest: HttpRequest<unknown> = originalReq.clone({
          setHeaders: {
            Authorization: `Bearer ${freshJwt}`,
          },
        });

        return next(retryRequest);
      }),
      catchError((err: ErrApiT<void>) => {
        Log.logTtl('❌ refresh fail');

        return from(useNav.replace('/auth/login')).pipe(
          catchError((err: unknown) => {
            // | ignore router fail & rethrow real error
            Log.logTtl('❌ navigation bug');
            return throwError(() => err);
          }),
          switchMap(() => throwError(() => err))
        );
      })
    );
  }
}
