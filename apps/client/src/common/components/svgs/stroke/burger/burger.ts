import { Component, input } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: `./burger.html`,
})
export class SvgStrokeBurger {
  width = input<'auto' | string>('100%');
  height = input<'auto' | string>('100%');

  fill = input<string | null>(null);
  stroke = input<string>('currentColor');
}
