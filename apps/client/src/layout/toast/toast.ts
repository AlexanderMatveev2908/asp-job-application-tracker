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

  // eslint-disable-next-line no-magic-numbers
  private readonly MAX_LINES: number = 3;

  @ViewChild('msgContainer') msgContainer!: ElementRef<HTMLElement>;

  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());
  public readonly eventMeta: Signal<AppEventMeta> = computed(() =>
    this.useAppEvent.getByT(this.toastState().eventT)
  );
  public readonly isClient: boolean = this.usePlatform.isClient;
  public readonly trimmedMsg: WritableSignal<string> = signal('');

  private setCutMsg(): void {
    if (!this.msgContainer) return;

    const msg = this.toastState().msg;

    this.trimmedMsg.set(
      TxtDOM.binaryTrim(msg, { el: this.msgContainer.nativeElement, maxLines: this.MAX_LINES })
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
}
