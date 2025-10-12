import { Directive, ElementRef, HostListener, inject, Signal } from '@angular/core';
import { USE_MOUSE_OUT__CB, USE_MOUSE_OUT__IS_OPEN } from './tokens';

@Directive({
  selector: '[appUseMouseOut]',
})
export class UseMouseOutDir {
  private readonly isOpen = inject<Signal<boolean>>(USE_MOUSE_OUT__IS_OPEN);
  private readonly cb = inject<() => void>(USE_MOUSE_OUT__CB);
  private readonly el = inject(ElementRef<HTMLElement>);

  @HostListener('document:mousedown', ['$event'])
  public onMouseOut(e: MouseEvent) {
    if (!this.isOpen()) return;

    const target = e.target as HTMLElement;
    const isIn: boolean = this.el.nativeElement.contains(target);

    if (!isIn) this.cb();
  }
}
