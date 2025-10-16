import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from './etc/types';

@Component({
  selector: 'app-pair-txt-svg',
  imports: [NgComponentOutlet],
  templateUrl: './pair-txt-svg.html',
  styleUrl: './pair-txt-svg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairTxtSvg {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly sizesProps: InputSignal<SpanSizesPropsT> = input<SpanSizesPropsT>({
    svg: 'sm',
    txt: 'lg',
  });

  public txtCls: Signal<string> = computed(() => `txt__${this.sizesProps().txt}`);
  public svgCls: Signal<string> = computed(() => `svg__${this.sizesProps().svg}`);
}
