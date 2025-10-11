
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ghost',
  templateUrl: `./ghost.html`,
})
export class SvgFillGhost {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
    fill = input<string>('currentColor');
    stroke = input<string | null>(null);
    
}
  