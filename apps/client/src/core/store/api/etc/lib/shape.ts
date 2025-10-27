import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StatusT } from '../types';
import { Form2faT } from '@/features/auth/etc/types';

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

export class LibApiShape {
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

  public static from2faFormToBody(data: Form2faT): Form2faT {
    if (!data?.cbcHmacToken) throw new ErrApp('expected cbcHmacToken present in request');

    if (!data.totpCode && !data.backupCode)
      throw new ErrApp('neither totp code nor bkp code was provided');

    const body: Form2faT = {
      cbcHmacToken: data.cbcHmacToken,
    };

    if (data.totpCode) body.totpCode = data.totpCode;
    else body.backupCode = data.backupCode;

    return body;
  }
}
