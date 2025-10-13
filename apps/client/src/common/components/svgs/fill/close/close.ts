import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: `./close.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgFillClose {
  width: Signal<'auto' | string> = input('100%');
  height: Signal<'auto' | string> = input('100%');

  fill: Signal<string> = input('currentColor');
  stroke: Signal<string | null> = input(null);
}
