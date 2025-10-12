
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.html`,
})
export class SvgStrokeHome {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
    fill = input<string | null>(null);
    stroke = input<string>('currentColor');
    
}
  