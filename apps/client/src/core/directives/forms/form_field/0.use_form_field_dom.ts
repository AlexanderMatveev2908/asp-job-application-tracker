import { AfterViewInit, Directive, input, InputSignal, ViewChild } from '@angular/core';
import { RefDomT } from '@/common/types/etc';
import { FocusDOM } from '@/core/lib/dom/focus';
import { UseFormFieldDir } from './0.use_form_field';

@Directive()
export abstract class UseFormFieldDomDir implements AfterViewInit {
  public abstract useFormFieldDir: UseFormFieldDir;
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  // ? children
  @ViewChild('formField') formField!: RefDomT;

  ngAfterViewInit(): void {
    this.useFormFieldDir.useDOM(() => {
      if (!this.focusOnMount()) return;

      FocusDOM.ifExists(this.formField);
    });
  }
}
