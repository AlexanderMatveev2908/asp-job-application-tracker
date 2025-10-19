import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { WithSwapPortal } from '@/core/directives/with_swap_portal';
import { RecCoordsT, UsePortal } from '@/core/hooks/use_portal';
import { Log } from '@/core/lib/log';
import { ErrApp } from '@/core/lib/err';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { timeline } from '@motionone/dom';

@Component({
  selector: 'app-cpy-paste',
  imports: [Portal],
  templateUrl: './cpy-paste.html',
  styleUrl: './cpy-paste.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpyPaste extends WithSwapPortal implements AfterViewInit {
  // ? svc
  private readonly usePlatForm: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly txt: InputSignal<string | null> = input.required();
  public readonly copied: WritableSignal<boolean> = signal(false);
  private timerID: NodeJS.Timeout | null = null;

  // ? static assets
  private readonly TIME_ANIMATION: number = 400;

  // ? children
  @ViewChild('pasteNotice') pasteNotice: RefDomT;

  // ? derived
  public readonly cpyPasteCoords: Signal<Partial<RecCoordsT>> = computed(() => ({
    top: this.coords()?.top,
    left: UsePortal.patchCoord(
      this.coords()?.left,
      // eslint-disable-next-line no-magic-numbers
      (v: number) => v + UsePortal.coordToInt(this.coords()?.with) / 2
    ),
  }));

  // ? listeners
  public async onCpy(): Promise<void> {
    const text: string | null = this.txt();
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
    this.usePlatForm.inCtx(() => {
      effect(() => {
        const isCpy: boolean = this.copied();

        const pasteNoticeDOM: ElDomT = this.pasteNotice?.nativeElement;

        if (!pasteNoticeDOM) return;

        if (isCpy) {
          timeline([
            [pasteNoticeDOM, { x: '-50%', y: '-50px' }, { duration: 0 }],

            [
              pasteNoticeDOM,
              { scale: [0, 1.4], opacity: [0, 1] },
              { duration: 0.2, easing: 'ease-out' },
            ],
            [pasteNoticeDOM, { scale: [1.4, 0.8] }, { duration: 0.2, easing: 'ease-in' }],
            [pasteNoticeDOM, { scale: [0.8, 1.1, 0.9, 1] }, { duration: 0.2, easing: 'ease-out' }],
            [pasteNoticeDOM, { opacity: [1, 0] }, { duration: 1.2, easing: 'linear' }],
          ]);
        } else {
          void null;
        }
      });
    });
  }
}
