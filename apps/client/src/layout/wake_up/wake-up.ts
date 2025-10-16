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
import { Lorem } from '@/core/lib/etc';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp extends Lorem implements AfterViewInit {
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
    this.usePlatform.runOnClientSync(() => {
      setTimeout(() => {
        this.isPop.set(true);
        // setTimeout(() => {
        //   this.isPop.set(false);
        // }, 1000);
      }, 500);
    });
  }
}
