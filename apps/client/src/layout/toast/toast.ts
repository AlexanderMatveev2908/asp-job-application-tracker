import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { AppEventMeta } from '@/common/types/events';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { TxtDOM } from '@/core/lib/dom/txt';
import { ToastStateT } from '@/features/toast/reducer/reducer';
import { ToastSlice } from '@/features/toast/slice';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ToastAnimationsSvc } from './etc/toast_animations';
import { ErrApi } from '@/core/lib/err';

@Component({
  selector: 'app-toast',
  imports: [SvgFillClose, NgTemplateOutlet],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast implements AfterViewInit {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useAppEvent: UseAppEvSvc = inject(UseAppEvSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly toastAnimations: ToastAnimationsSvc = inject(ToastAnimationsSvc);

  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());
  public readonly eventMeta: Signal<AppEventMeta> = computed(() =>
    this.useAppEvent.getByT(this.toastState().eventT)
  );
  public readonly isClient: boolean = this.usePlatform.isClient;

  // ? 📜 message trim
  @ViewChild('msgContainer') msgContainer!: ElementRef<HTMLElement>;

  public readonly trimmedMsg: WritableSignal<string> = signal('');

  private setCutMsg(): void {
    const msg: string = this.toastState().msg;
    const MAX_LINES = 3;

    if (!this.msgContainer) return;

    this.trimmedMsg.set(
      TxtDOM.binaryTrim(msg, { el: this.msgContainer.nativeElement, maxLines: MAX_LINES })
    );
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setCutMsg();
  }

  private readonly trimEffect: EffectRef = effect(() => {
    this.setCutMsg();
  });

  ngAfterViewInit(): void {
    this.setCutMsg();
  }

  // ? 🎨 toast render
  @ViewChild('toast') toast!: ElementRef<HTMLElement>;
  @ViewChild('timerToast') timerToast!: ElementRef<HTMLElement>;

  public closeClick(): void {
    // ? always first clear timer on close
    // ? it means process finished completely
    this.clearTimerID();
    this.toastSlice.closeToast();
  }

  // ? ⏳ timer
  private timerID: NodeJS.Timeout | null = null;

  private clearTimerID(): void {
    // ? by default be ready to receive null
    if (this.timerID) clearTimeout(this.timerID);
    this.timerID = null;
  }

  private programClose(): void {
    const IN_ANIMATION_LAST = 5000;

    this.timerID = setTimeout(() => {
      const isToast: boolean = this.toastState().isToast;
      // ! memory leak to manage
      if (this.timerID && !isToast) {
        this.clearTimerID();
        return;
      }
      // ? if timer is null or toast is false means process
      // ? has already been closed by an existing new call
      else if (!this.timerID || !isToast) return;

      this.closeClick();
    }, IN_ANIMATION_LAST);
  }

  // ? main logic 🛠️
  private handleToastOpen(
    prevID: string | null,
    { toastDOM, timerDOM }: { toastDOM: HTMLElement; timerDOM: HTMLElement }
  ): void {
    const OUT_ANIMATION_LAST = 300;
    // ? first run will have prev as null because openToast set:
    // ? - curr => new uuid
    // ? - prev => curr (which if has been closed properly ill be null)
    // ? so normally this block will handle base cases
    if (!prevID) {
      this.toastAnimations.toastIn(toastDOM, timerDOM);
      this.programClose();
    } else {
      // ? existing toast
      // ? clear existing timer to avoid memory leaks
      // ? close it with animations and trigger animation again
      // ? only after `out` one has finished
      this.clearTimerID();
      this.toastAnimations.toastOut(toastDOM, timerDOM);
      setTimeout(() => {
        this.toastAnimations.toastIn(toastDOM, timerDOM);
        this.programClose();
      }, OUT_ANIMATION_LAST);
    }
  }

  private handleCloseToast({
    timerDOM,
    toastDOM,
  }: {
    toastDOM: HTMLElement;
    timerDOM: HTMLElement;
  }): void {
    // ? normal close flow
    this.clearTimerID();
    this.toastAnimations.toastOut(toastDOM, timerDOM);
  }

  // eslint-disable-next-line complexity
  private readonly timerEffect: EffectRef = effect(() => {
    const toastDOM: HTMLElement = this.toast?.nativeElement;
    const timerDOM: HTMLElement = this.timerToast?.nativeElement;

    const { isToast, currID, prevID } = this.toastState();

    if (!this.isClient || !toastDOM || !timerDOM) return;

    if (isToast && currID) {
      this.handleToastOpen(prevID, { toastDOM, timerDOM });
    } else if (isToast && !currID) {
      // ! error if by a toast exists with no ID
      throw new ErrApi('toast should never be alive without a currID set');
    } else if (!isToast) {
      this.handleCloseToast({ toastDOM, timerDOM });
    }
  });
}
