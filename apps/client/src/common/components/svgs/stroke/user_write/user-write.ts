
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-write',
  templateUrl: `./user-write.html`,
})
export class SvgStrokeUserWrite {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
    fill = input<string | null>(null);
    stroke = input<string>('currentColor');
    
}
  