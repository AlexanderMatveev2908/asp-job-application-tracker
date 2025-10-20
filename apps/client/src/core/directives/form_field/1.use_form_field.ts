import { AfterViewInit, Directive, input, InputSignal, ViewChild } from '@angular/core';
import { UseFieldRootDir } from './0.use_field_root';
import { RefDomT } from '@/common/types/etc';
import { FocusDOM } from '@/core/lib/dom/focus';

@Directive()
export abstract class UseFormFieldDir extends UseFieldRootDir implements AfterViewInit {
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  // ? children
  @ViewChild('formField') formField!: RefDomT;

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      if (!this.focusOnMount()) return;

      FocusDOM.ifExists(this.formField);
    });
  }
}
