import { UseSpinDir } from '@/core/directives/use_spin';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spin-txt',
  imports: [],
  templateUrl: './spin-txt.html',
  styleUrl: './spin-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinTxt extends UseSpinDir {}
