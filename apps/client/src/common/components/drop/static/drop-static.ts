import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { SvgFillUp } from '../../svgs/fill/up/up';

@Component({
  selector: 'app-drop-static',
  imports: [Span, SvgFillUp],
  templateUrl: './drop-static.html',
  styleUrl: './drop-static.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropStatic {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'xl',
  };
}
