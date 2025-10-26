import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SpanEventPropsT } from '../../els/span/etc/types';
import { BtnListenersT, BtnStatePropsT, WithIdT } from '@/common/types/etc';

export interface BtnPopChoicePropsT
  extends SpanEventPropsT,
    WithIdT,
    BtnStatePropsT,
    BtnListenersT {}

@Component({
  selector: 'app-pop-choices',
  imports: [BtnShadow, UseSpanDir, UseIDsDir],
  templateUrl: './pop-choices.html',
  styleUrl: './pop-choices.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopChoices {
  public readonly txt: InputSignal<string> = input.required();

  public readonly choiceA: InputSignal<Partial<BtnPopChoicePropsT>> = input.required();
  public readonly choiceB: InputSignal<Partial<BtnPopChoicePropsT>> = input.required();

  public withDefault(choice: 'a' | 'b'): BtnPopChoicePropsT {
    const base: Partial<BtnPopChoicePropsT> = choice === 'a' ? this.choiceA() : this.choiceB();
    const someonePending: boolean = !!(this.choiceA().isPending || this.choiceB().isPending);

    return (
      choice === 'a'
        ? {
            ...base,
            eventT: base.eventT ?? 'ERR',
            label: 'Delete',
            isDisabled: someonePending,
          }
        : {
            ...base,
            eventT: base.eventT ?? 'OK',
            label: 'I change idea',
            isDisabled: someonePending,
          }
    ) as BtnPopChoicePropsT;
  }
}
