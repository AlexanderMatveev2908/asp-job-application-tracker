
import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';

@Component({
  selector: 'app-svg-fill-error',
  templateUrl: `./error.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgFillError {
    width: Signal<'auto' | string> = input('100%');
    height: Signal<'auto' | string> = input('100%');
    
    fill: Signal<string> = input('currentColor');
    stroke: Signal<string | null> = input(null);
    
}
