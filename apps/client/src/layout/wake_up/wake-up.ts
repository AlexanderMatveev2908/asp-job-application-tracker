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
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { WakeUpApiSvc } from '@/features/wake_up/api';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp implements AfterViewInit {
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);
  public readonly isPop: WritableSignal<boolean | null> = signal(null);
  public readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private readonly closePop: () => void = () => {
    this.isPop.set(false);
  };

  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'wake_up',
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.closePop,
  };

  ngAfterViewInit(): void {
    this.wakeUpApi.wrap();
  }
}
