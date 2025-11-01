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
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { ApplicationItemUiFkt } from './etc/ui_fkt';
import { WithIdT } from '@/common/types/etc';
import { Span } from '@/common/components/els/span/span';

@Component({
  selector: 'app-application-item',
  imports: [Span],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationItem {
  public readonly application: InputSignal<ApplicationT> = input.required();

  // ? derived
  public readonly cssTheme: Signal<string> = computed(() =>
    LibCssApplication.cssVarByStatus(this.application().status)
  );

  public readonly pairsLabelSvg: Signal<(SpanPropsT & WithIdT)[]> = computed(() =>
    ApplicationItemUiFkt.pairsLabelSvg(this.application())
  );
}
