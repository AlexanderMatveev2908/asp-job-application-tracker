import { UseFormShapeDir } from '@/core/directives/use_form_shape';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  Signal,
  TemplateRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '../../els/span/etc/types';
import { BtnStatePropsT, Opt, RefTmptT } from '@/common/types/etc';

@Component({
  selector: 'app-form-shape',
  imports: [ReactiveFormsModule, NgTemplateOutlet, BtnShadow],
  templateUrl: './form-shape.html',
  styleUrl: './form-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormShape extends UseFormShapeDir {
  // ? span of btn props • static
  public readonly spanProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Submit',
    Svg: null,
  };

  @ContentChild('footer', { read: TemplateRef }) footer: Opt<RefTmptT>;

  // ? dynamic state change
  public btnProps: Signal<BtnStatePropsT> = computed(() => ({
    isDisabled: false,
    isPending: this.isPending(),
  }));

  // ? playwright stuff
  public derivedSubmitId: Signal<string> = computed(() => this.testId() + '__submit');
}
