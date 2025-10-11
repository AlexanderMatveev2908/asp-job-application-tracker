
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-complex',
  templateUrl: `./complex.html`,
})
export class SvgAdvComplex {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
}
  