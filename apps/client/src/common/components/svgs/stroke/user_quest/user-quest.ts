
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-stroke-user-quest',
  templateUrl: `./user-quest.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgStrokeUserQuest {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
    fill: InputSignal<string | null> = input<string | null>(null);
    stroke: InputSignal<string> = input<string>('currentColor');
    
}
