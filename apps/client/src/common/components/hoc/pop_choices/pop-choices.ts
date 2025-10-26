import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanEventPropsT, SpanPropsT } from '../../els/span/etc/types';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';

export interface BtnPopChoicePropsT {
  label: string;
  isPending: boolean;
  id: string;
}

@Component({
  selector: 'app-pop-choices',
  imports: [BtnShadow, UseSpanDir, UseIDsDir],
  templateUrl: './pop-choices.html',
  styleUrl: './pop-choices.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopChoices {
  public readonly txt: InputSignal<string> = input.required();

  public readonly choiceA: InputSignal<BtnPopChoicePropsT> = input.required();
  public readonly choiceB: InputSignal<BtnPopChoicePropsT> = input.required();

  public readonly getSpanProps: (idx: number) => Signal<SpanEventPropsT> = (idx: number) => {
    const base: Pick<SpanPropsT, 'Svg'> = {
      Svg: null,
    };

    return computed(() => ({
      ...base,
      ...(!idx ? this.choiceA() : this.choiceB()),
      eventT: !idx ? 'ERR' : 'OK',
    }));
  };
}
