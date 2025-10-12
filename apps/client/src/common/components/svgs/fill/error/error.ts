
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: `./error.html`,
})
export class SvgFillError {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
    fill = input<string>('currentColor');
    stroke = input<string | null>(null);
    
}
  