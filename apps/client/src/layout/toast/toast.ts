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

  // ? ⏳ timer

  @ViewChild('toast') toast!: ElementRef<HTMLElement>;
  @ViewChild('timerToast') timerToast!: ElementRef<HTMLElement>;

  private readonly timerID: WritableSignal<NodeJS.Timeout | null> = signal(null);

  private readonly timerEffect: EffectRef = effect(() => {
    const isToast: boolean = this.toastState().isToast;
    const TIME_TOAST_LAST = 5000;

    if (isToast)
      this.timerID.set(
        setTimeout(() => {
          this.toastSlice.closeToast();
          this.timerID.set(null);
        }, TIME_TOAST_LAST)
      );
  });

  // ? 🎬 animations
  private readonly animationEffect: EffectRef = effect(() => {
    const toastDOM: HTMLElement = this.toast?.nativeElement;
    const timerDOM: HTMLElement = this.timerToast?.nativeElement;

    const isToast: boolean = this.toastState().isToast;

    if (!this.isClient || !toastDOM || !timerDOM) return;

    if (isToast) {
      this.toastAnimations.toastIn(toastDOM, timerDOM);
    } else {
      this.toastAnimations.toastOut(toastDOM, timerDOM);
    }
  });
}
