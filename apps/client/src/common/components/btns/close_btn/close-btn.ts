import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SvgFillClose } from '../../svgs/fill/close/close';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-close-btn',
  imports: [SvgFillClose],
  templateUrl: './close-btn.html',
  styleUrl: './close-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseBtn {
  public readonly closeClick: InputSignal<() => void> = input.required();
  public readonly disabled: InputSignal<boolean> = input(false);
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
}
