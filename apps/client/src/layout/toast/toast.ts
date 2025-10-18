import { UseEventMeta } from '@/core/hooks/use_event_meta/use_event_meta';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { AppEventMetaT } from '@/core/hooks/use_event_meta/etc/types';
import { ToastRender } from './etc/3.render_toast';

@Component({
  selector: 'app-toast',
  imports: [CloseBtn, NgTemplateOutlet, CloseBtn],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast extends ToastRender {
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.toastState().eventT)
  );
}
