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
  selector: 'app-span',
  imports: [NgComponentOutlet],
  templateUrl: './span.html',
  styleUrl: './span.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Span {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly sizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });

  public txtCls: Signal<string> = computed(() => `txt__${this.sizesProps().txt ?? 'lg'}`);
  public svgCls: Signal<string> = computed(() => `svg__${this.sizesProps().svg ?? 'sm'}`);
}
