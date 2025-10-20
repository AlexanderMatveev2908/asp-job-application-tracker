import { inject, Injectable } from '@angular/core';
import { ErrApiT, ObsOnOkT, ObsResT, OptErrApi, OptToastApiT, ResApiT, StatusT } from './types';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';
import { ToastSlice } from '@/features/toast/slice';
import { NoticeSlice } from '@/features/notice/slice';
import { UseNavSvc } from '@/core/hooks/use_nav';
import { ConfApiSvc } from './conf_api';
import { ArgsApi } from '../requests/args_api';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class EventsMngSvc {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly confApi: ConfApiSvc = inject(ConfApiSvc);

  public readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';

  // ? 📊 manager
  public mng<T>(cb: ObsResT<T>, args: ArgsApi): ObsOnOkT<T> {
    return this.whenErr(this.withToast(cb, args.getOptToast()), args.getOptErr());
  }

  // ? ☢️ notice error
  private readonly defOptErr: OptErrApi = {
    pushOnErr: false,
    pushOnStatus: [StatusT.FORBIDDEN, StatusT.TOO_MANY_REQUESTS, StatusT.INTERNAL_SERVER_ERROR],
  };

  private whenErr<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApi>>): ObsOnOkT<T> {
    const options: Partial<OptErrApi> = opt ?? this.defOptErr;

    return cb.pipe(
      catchError((err: ErrApiT<T>) => {
        if (
          !options.pushOnErr &&
          !options.pushOnStatus?.some((code: number) => code === err.status)
        )
          throw err;

        this.noticeSlice.notice = {
          eventT: 'ERR',
          msg: err.error.msg ?? this.DEF_CLIENT_ERR_MSG,
          status: err.status,
        };

        const navigation: Promise<boolean> = this.useNav.replace('/notice');

        return from(navigation).pipe(switchMap(() => EMPTY));
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

  private withToast<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptToastApiT>>): ObsResT<T> {
    const options: Partial<OptToastApiT> = opt ?? this.defOptToast();

    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => {
          if (!options.toastOk) return;

          this.toastSlice.openToast({
            eventT: 'OK',
            msg: res.msg ?? '✅ operation successful',
            status: res.status,
          });
        },
        error: (res: ErrApiT<T>) => {
          if (!options.toastErr) return;

          this.toastSlice.openToast({
            eventT: 'ERR',
            msg: res.error.msg ?? this.DEF_CLIENT_ERR_MSG,
            status: res.status,
          });
        },
      })
    );
  }
}
