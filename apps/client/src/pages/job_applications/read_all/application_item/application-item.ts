import { ApplicationT } from '@/features/applications/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { LibCssApplication } from './etc/css';

@Component({
  selector: 'app-application-item',
  imports: [],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationItem {
  public readonly application: InputSignal<ApplicationT> = input.required();

  public readonly cssTheme: Signal<string> = computed(() =>
    LibCssApplication.cssVarByStatus(this.application().status)
  );
}
