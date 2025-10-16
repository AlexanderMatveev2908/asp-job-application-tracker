import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Popup } from '../popup/popup';
import { PopupStaticPropsT } from '../popup/etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { WakeUpApiSvc } from '@/features/wake_up/api';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { ToastSlice } from '@/features/toast/slice';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { Prs } from '@/core/lib/data_structure/formatters';
import { WakeUpSlice } from '@/features/wake_up/slice';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp implements AfterViewInit {
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  public readonly isPop: WritableSignal<boolean | null> = signal(null);
  private readonly closePop: () => void = () => {
    this.isPop.set(false);
  };

  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'wake_up',
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.closePop,
  };

  private pollIf(): boolean {
    if (this.usePlatform.isServer) return false;

    const tmsp: string | null = this.useStorage.getItem('wakeUp') ?? '0';
    const lastCall: number = isNaN(+tmsp) ? 0 : +tmsp;

    this.wakeUpSlice.setLastCall(lastCall);

    const now: number = Date.now();
    // eslint-disable-next-line no-magic-numbers
    const MS_OFFSET: number = Prs.minutesToMs(15);
    if (now - lastCall < MS_OFFSET) return false;

    return true;
  }

  ngAfterViewInit(): void {
    if (!this.pollIf()) return;

    this.usePlatform
      .whenStable<ResApiT<void>>(
        this.wakeUpApi.poll().pipe(
          tap(() => this.isPop.set(true)),
          finalize(() => this.isPop.set(false))
        )
      )
      .subscribe({
        next: (res: ResApiT<void>) => {
          this.toastSlice.ifNotPresent({
            msg: res.msg ?? 'server available',
            eventT: 'OK',
            status: res.status,
          });
          const now = Date.now();
          this.wakeUpSlice.setLastCallWithStorage(now);
        },
        error: (err: ErrApiT<void>) => {
          this.toastSlice.ifNotPresent({
            msg: err.error.msg ?? 'server not available',
            status: err.status,
            eventT: 'ERR',
          });
        },
      });
  }
}
