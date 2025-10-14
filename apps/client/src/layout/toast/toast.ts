import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { ToastSlice } from '@/features/toast/slice';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [SvgFillClose],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
}
