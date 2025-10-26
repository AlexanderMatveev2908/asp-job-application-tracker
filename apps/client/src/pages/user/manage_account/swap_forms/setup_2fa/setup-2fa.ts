import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { Nullable } from '@/common/types/etc';
import { Setup2faReturnT, UserT } from '@/features/user/etc/types';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseKitFormUserSvc } from '@/features/user/etc/services/use_kit_form_user';
import { Content2faMessage } from './content_options/message/content2fa-message';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-setup-2fa',
  imports: [Content2faMessage, UseMetaEventDir],
  templateUrl: './setup-2fa.html',
  styleUrl: './setup-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class Setup2fa {
  // ? scv
  private readonly useKitFormUser: UseKitFormUserSvc = inject(UseKitFormUserSvc);

  // ? derived
  public readonly user: Signal<Nullable<UserT>> = this.useKitFormUser.useKitUser.userSlice.user;

  // ? hooks
  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? listeners
  public readonly onClick: () => void = () => {
    const cbcHmac: Nullable<string> = this.useKitFormUser.cbcHmacSlice.cbcHmac();

    LibApiShape.throwIfCbcHmacMissing(
      cbcHmac,
      this.useApiTracker.track(
        this.useKitFormUser.useKitUser.userApi.setup2FA({ cbcHmacToken: cbcHmac! }).pipe(
          tap((res: ResApiT<Setup2faReturnT>) => {
            console.log(res);
          })
        )
      )
    ).subscribe();
  };
}
