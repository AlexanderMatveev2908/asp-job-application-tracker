import { NoticeSlice } from '@/features/notice/slice';
import { inject, Injectable } from '@angular/core';
import { SideEffectsToastSvc } from './1.toast';
import { ErrApiT, ObsOnOkT, ObsResT, OptErrApi, StatusT } from '../types';
import { Nullable } from '@/common/types/etc';
import { catchError, EMPTY, from, switchMap } from 'rxjs';
import { UseNavSvc } from '@/core/hooks/use_nav';

@Injectable()
export abstract class SideEffectsNoticeSvc extends SideEffectsToastSvc {
  // ? svc
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? helper
  private readonly defOptErr: OptErrApi = {
    pushOnErr: false,
    pushOnStatus: [StatusT.FORBIDDEN, StatusT.TOO_MANY_REQUESTS, StatusT.INTERNAL_SERVER_ERROR],
  };

  // ? main
  protected withNotice<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApi>>): ObsOnOkT<T> {
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
}
