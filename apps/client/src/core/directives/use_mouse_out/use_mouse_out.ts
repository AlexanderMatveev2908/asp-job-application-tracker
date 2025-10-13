import { Directive, ElementRef, HostListener, inject, Signal } from '@angular/core';
import { USE_MOUSE_OUT__CB, USE_MOUSE_OUT__IS_OPEN } from './tokens';

@Directive({
  selector: '[appUseMouseOut]',
})
export class UseMouseOutDir {
  private readonly isOpen: Signal<boolean> = inject(USE_MOUSE_OUT__IS_OPEN);
  private readonly cb: () => void = inject(USE_MOUSE_OUT__CB);
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @HostListener('document:mousedown', ['$event'])
  public onMouseOut(e: MouseEvent): void {
    if (!this.isOpen()) return;

    const target = e.target as HTMLElement;
    const isIn: boolean = this.el.nativeElement.contains(target);

    if (!isIn) this.cb();
  }
}
