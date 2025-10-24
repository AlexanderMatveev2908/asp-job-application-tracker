import { UseFormShapeDir } from '@/core/directives/use_form_shape';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  input,
  InputSignal,
  Signal,
  TemplateRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSubmit } from '../form_submit/form-submit';
import { RefTemplateT } from '@/common/types/etc';

@Component({
  selector: 'app-form-shape',
  imports: [ReactiveFormsModule, NgTemplateOutlet, FormSubmit],
  templateUrl: './form-shape.html',
  styleUrl: './form-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormShape extends UseFormShapeDir {
  @ContentChild('footer', { read: TemplateRef }) footer: RefTemplateT;
  public readonly useFullPage: InputSignal<boolean> = input.required();

  public readonly css: Signal<string> = computed(() =>
    this.useFullPage() ? 'root__full_page' : 'root__content'
  );
}
