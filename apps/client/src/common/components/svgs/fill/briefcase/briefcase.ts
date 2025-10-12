
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-briefcase',
  templateUrl: `./briefcase.html`,
})
export class SvgFillBriefcase {
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    
    fill = input<string>('currentColor');
    stroke = input<string | null>(null);
    
}
  