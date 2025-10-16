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
import { Log } from '@/core/lib/log';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-wake-up',
  imports: [Popup],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp implements AfterViewInit {
  public readonly isPop: WritableSignal<boolean | null> = signal(null);
  public readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private closePop(): void {
    this.isPop.set(false);
  }

  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'wake_up',
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.closePop,
  };

  ngAfterViewInit(): void {
    this.usePlatform.runOnClientSync(() => {
      setTimeout(() => {
        Log.log(this.isPop());
        this.isPop.set(true);

        setTimeout(() => {
          this.isPop.set(false);
        }, 1000);
      }, 1500);
    });
  }
}
