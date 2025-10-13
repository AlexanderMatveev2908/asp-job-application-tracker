
import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgStrokeHome {
    width: Signal<'auto' | string> = input('100%');
    height: Signal<'auto' | string> = input('100%');
    
    fill: Signal<string | null> = input(null);
    stroke: Signal<string> = input('currentColor');
    
}
  