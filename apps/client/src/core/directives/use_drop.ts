import {
  ContentChild,
  Directive,
  HostListener,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UseTestIdDir } from './use_test_id';
import { UseMouseOutSvc } from '../hooks/use_mouse_out';
import { RefDomT, RefTemplateT } from '@/common/types/etc';

@Directive()
export abstract class UseDropDir extends UseTestIdDir {
  // ? svc
  protected readonly useMouseOut: UseMouseOutSvc = inject(UseMouseOutSvc);

  // ? props
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly setIsOpen: InputSignal<(val: boolean) => void> = input.required();

  // ? children & projected
  @ViewChild('drop') drop: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef: RefTemplateT;

  // ? listeners
  public onClick(): void {
    this.setIsOpen()(!this.isOpen());
  }

  @HostListener('document:mousedown', ['$event'])
  protected onMouseDown(e: MouseEvent): void {
    this.useMouseOut.onMouseOut(this.drop, e, () => this.setIsOpen()(false));
  }
}
