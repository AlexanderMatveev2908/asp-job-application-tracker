
import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';

@Component({
  selector: 'app-svg-fill-briefcase',
  templateUrl: `./briefcase.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgFillBriefcase {
    width: Signal<'auto' | string> = input('100%');
    height: Signal<'auto' | string> = input('100%');
    
    fill: Signal<string> = input('currentColor');
    stroke: Signal<string | null> = input(null);
    
}
