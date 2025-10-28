import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-swapper',
  imports: [],
  templateUrl: './dynamic-swapper.html',
  styleUrl: './dynamic-swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapper {}
