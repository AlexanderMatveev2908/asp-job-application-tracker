import { NoticeSlice } from '@/features/notice/slice';
import { inject, Injectable } from '@angular/core';
import { SideEffectsToastSvc } from './2.toast';
import { ErrApiT, ObsOnOkT, ObsResT, OptErrApiT, StatusT } from '../types';
import { Nullable } from '@/common/types/etc';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';

@Injectable()
export abstract class SideEffectsNoticeSvc extends SideEffectsToastSvc {
  // ? svc
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? helper
  private readonly defOptErr: OptErrApiT = {
    pushOnErr: false,
    pushOnStatus: [StatusT.FORBIDDEN, StatusT.TOO_MANY_REQUESTS, StatusT.INTERNAL_SERVER_ERROR],
  };

  // ? main
  protected withNotice<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApiT>>): ObsOnOkT<T> {
    const options: Partial<OptErrApiT> = opt ?? this.defOptErr;

    return cb.pipe(
      catchError((err: ErrApiT<T>) => {
        if (
          !options.pushOnErr &&
          !options.pushOnStatus?.some((code: number) => code === err.status)
        )
          return throwError(() => err);

        this.noticeSlice.notice = {
          eventT: 'ERR',
          msg: err.error.msg ?? this.DEF_CLIENT_ERR_MSG,
          status: err.status,
        };

        const navigation: Promise<boolean> = this.useNav.replace('/notice', { from: 'error' });

        return from(navigation).pipe(switchMap(() => EMPTY));
      })
    );
  }
}
