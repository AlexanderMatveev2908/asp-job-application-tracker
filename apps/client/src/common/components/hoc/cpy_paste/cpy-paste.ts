/* eslint-disable no-magic-numbers */
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { UseSwapPortalDir } from '@/core/directives/use_portal/1.use_swap_portal';
import { Log } from '@/core/lib/dev/log';
import { ErrApp } from '@/core/lib/err';
import { Nullable, RefDomT, TimerIdT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { CpyPasteAnimation } from './etc/animations';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';

@Component({
  selector: 'app-cpy-paste',
  imports: [Portal],
  templateUrl: './cpy-paste.html',
  styleUrl: './cpy-paste.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpyPaste extends UseSwapPortalDir implements AfterViewInit {
  // ? svc
  private readonly usePlatForm: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly txt: InputSignal<Nullable<string>> = input.required();
  public readonly copied: WritableSignal<boolean> = signal(false);
  private timerID: TimerIdT = null;

  // ? static assets
  private readonly TIME_ANIMATION: number = 400;

  // ? children
  @ViewChild('pasteNotice') pasteNotice: RefDomT;

  // ? derived
  public readonly cpyPasteCoords: Signal<Partial<RecCoordsT>> = computed(() => ({
    top: this.coords()?.top,
    left: PortalDOM.patchCoord(
      this.coords()?.left,
      (v: number) => v + PortalDOM.coordToInt(this.coords()?.with) / 2
    ),
  }));

  // ? listeners
  public async onCpy(): Promise<void> {
    const text: Nullable<string> = this.txt();
    try {
      if (!text) throw new ErrApp('tried to copy None');

      await navigator.clipboard.writeText(text);
      this.copied.set(true);

      this.timerID = setTimeout(() => {
        if (this.timerID && this.copied()) this.copied.set(false);

        this.timerID = LibEtc.clearTmrID(this.timerID);
      }, this.TIME_ANIMATION);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Log.log(err);
    }
  }

  // ? animations
  override ngAfterViewInit(): void {
    this.useEffect(() => {
      const isCpy: boolean = this.copied();
      if (!isCpy) return;

      CpyPasteAnimation.main(this.pasteNotice);
    });
  }
}
