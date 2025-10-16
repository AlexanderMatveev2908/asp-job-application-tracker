import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SpanPropsT } from '../../els/span/etc/types';
import { PairTxtSvg } from '../../els/span/pair-txt-svg';

@Component({
  selector: 'app-drop-static',
  imports: [PairTxtSvg],
  templateUrl: './drop-static.html',
  styleUrl: './drop-static.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropStatic {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
}
