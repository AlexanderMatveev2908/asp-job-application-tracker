import { NoticeSlice } from '@/features/notice/slice';
import { inject, Injectable } from '@angular/core';
import { UseSideEffectsToastHk } from './2.toast';
import { ErrApiT, ObsOnOkT, ObsResT, OptErrApiT, StatusT } from '../../../types';
import { Nullable } from '@/common/types/etc';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';

@Injectable()
export abstract class UseSideEffectsNoticeHk extends UseSideEffectsToastHk {
  // ? svc
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  // ? helper
  private readonly defOptErr: OptErrApiT = {
    pushOnErr: false,
    pushOnStatus: [StatusT.FORBIDDEN, StatusT.TOO_MANY_REQUESTS, StatusT.INTERNAL_SERVER_ERROR],
  };

  // ? main
  protected withNotice<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApiT>>): ObsOnOkT<T> {
    const options: Partial<OptErrApiT> = {
      pushOnErr: !!opt?.pushOnErr,
      pushOnStatus: [...this.defOptErr.pushOnStatus, ...(opt?.pushOnStatus ?? [])],
    };

    return cb.pipe(
      catchError((err: ErrApiT<T>) => {
        if (
          !options.pushOnErr &&
          !options.pushOnStatus?.some((code: number) => code === err?.status)
        )
          return throwError(() => err);

        if (this.cbcHmacSlice.present()) this.cbcHmacSlice.clearCbcHmac({ startTmr: true });

        this.noticeSlice.notice = {
          eventT: 'ERR',
          msg: err?.error?.msg ?? this.DEF_CLIENT_ERR_MSG,
          status: err?.status ?? 0,
        };

        const navigation: Promise<boolean> = this.useNav.replace('/notice', { from: 'err' });

        return from(navigation).pipe(switchMap(() => EMPTY));
      })
    );
  }
}
