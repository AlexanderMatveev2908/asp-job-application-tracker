import { inject, Injectable } from '@angular/core';
import { ErrApiT, OptErrApi, OptToastApiT, ResApiT } from './types';
import { catchError, Observable, tap } from 'rxjs';
import { ToastSlice } from '@/features/toast/slice';
import { NoticeSlice } from '@/features/notice/slice';
import { UseNavSvc } from '@/core/hooks/use_nav';
import { ConfApiSvc } from './conf_api';
import { ArgsApi } from '../requests/args_api';

@Injectable({
  providedIn: 'root',
})
export class EventsMngSvc {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly confApi: ConfApiSvc = inject(ConfApiSvc);

  public mng<T>(cb: Observable<ResApiT<T>>, args: ArgsApi): Observable<ResApiT<T>> {
    return this.whenErr(this.withToast(cb, args.getOptToast()), args.getOptErr());
  }

  // ? ☢️ notice error
  private defOptErr(): OptErrApi {
    return {
      pushOnErr: false,
      // eslint-disable-next-line no-magic-numbers
      pushOnStatus: [403, 429, 500],
    };
  }

  private whenErr<T>(
    cb: Observable<ResApiT<T>>,
    opt: Partial<OptErrApi> | null
  ): Observable<ResApiT<T>> {
    const options: Partial<OptErrApi> = opt ?? this.defOptErr();

    return cb.pipe(
      catchError(async (err: ErrApiT<T>) => {
        if (
          !options.pushOnErr &&
          !options.pushOnStatus?.some((code: number) => code === err.status)
        )
          throw err;

        this.noticeSlice.noticeWithoutCb = {
          eventT: 'ERR',
          msg: err.error.msg,
          status: err.status,
        };
        await this.useNav.navWithReplace('/notice');

        throw err;
      })
    );
  }

  // ? 🎨 toast
  private defOptToast(): OptToastApiT {
    return {
      toastErr: true,
      toastOk: this.confApi.get()?.method !== 'GET',
    };
  }

  private withToast<T>(
    cb: Observable<ResApiT<T>>,
    opt: Partial<OptToastApiT> | null
  ): Observable<ResApiT<T>> {
    const options: Partial<OptToastApiT> = opt ?? this.defOptToast();

    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => {
          if (!options.toastOk) return;

          this.toastSlice.openToast({
            eventT: 'OK',
            msg: res.msg,
            status: res.status,
          });
        },
        error: (res: ErrApiT<T>) => {
          if (!options.toastErr) return;

          this.toastSlice.openToast({
            eventT: 'ERR',
            msg: res.error.msg,
            status: res.status,
          });
        },
      })
    );
  }
}
