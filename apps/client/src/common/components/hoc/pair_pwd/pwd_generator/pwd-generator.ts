import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pwd-generator',
  imports: [],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator {}
