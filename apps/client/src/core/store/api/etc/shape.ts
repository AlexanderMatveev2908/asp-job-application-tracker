import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StatusT } from './types';

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

export class ApiShape {
  public static isHttpRes(e: HttpEvent<unknown> | HttpErrorResponse): boolean {
    return e instanceof HttpResponse || e instanceof HttpErrorResponse;
  }

  public static throwIfCbcHmacMissing(
    cbcHmacToken: Nullable<string>,
    obs: Observable<unknown>
  ): Observable<unknown> {
    return !cbcHmacToken
      ? throwError(
          () =>
            new ErrApp(
              'bug => missing cbc_hmac and still user submit form recover_pwd',
              StatusT.UNAUTHORIZED
            )
        )
      : obs;
  }
}
