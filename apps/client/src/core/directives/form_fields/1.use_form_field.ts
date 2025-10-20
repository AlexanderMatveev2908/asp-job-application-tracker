import { AfterViewInit, Directive, input, InputSignal, ViewChild } from '@angular/core';
import { UseFieldRoot } from './0.use_field_root';
import { RefDomT } from '@/common/types/etc';

@Directive()
export abstract class UseFormField extends UseFieldRoot implements AfterViewInit {
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  // ? children
  @ViewChild('formField') formField!: RefDomT;

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      if (!this.focusOnMount()) return;

      const el = this.formField?.nativeElement;
      if (!el) return;

      el.focus();
    });
  }
}
