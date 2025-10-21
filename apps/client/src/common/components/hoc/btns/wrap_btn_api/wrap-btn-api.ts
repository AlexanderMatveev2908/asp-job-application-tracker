import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

@Component({
  selector: 'app-wrap-btn-api',
  imports: [SpinBtn],
  templateUrl: './wrap-btn-api.html',
  styleUrl: './wrap-btn-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapBtnApi {
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();
}
