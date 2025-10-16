import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';

@Component({
  selector: 'app-drop-abs',
  imports: [Span],
  templateUrl: './drop-abs.html',
  styleUrl: './drop-abs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropAbs {
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly handleToggle: InputSignal<() => void> = input.required();
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input.required();
}
