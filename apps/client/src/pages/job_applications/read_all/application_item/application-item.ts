import { ApplicationT } from '@/features/applications/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { LibCssApplication } from './etc/css';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { ApplicationItemUiFkt } from './etc/ui_fkt';
import { WithIdT } from '@/common/types/etc';
import { Span } from '@/common/components/els/span/span';
import { DropAbs } from '@/common/components/drop/abs/drop-abs';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseDropHk } from '@/core/hooks/use_drop';
import { SvgStrokeNotes } from '@/common/components/svgs/stroke/notes/notes';
import { SvgFillStatus } from '@/common/components/svgs/fill/status/status';

@Component({
  selector: 'app-application-item',
  imports: [Span, DropAbs, UseIDsDir],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class ApplicationItem {
  public readonly application: InputSignal<ApplicationT> = input.required();

  // ? hooks
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? derived
  public readonly cssTheme: Signal<string> = computed(() =>
    LibCssApplication.cssVarByStatus(this.application().status)
  );

  public readonly pairsLabelSvg: Signal<(SpanPropsT & WithIdT)[]> = computed(() =>
    ApplicationItemUiFkt.pairsLabelSvg(this.application())
  );

  public readonly spanNotes: SpanPropsT = {
    label: null,
    Svg: SvgStrokeNotes,
  };

  public readonly spanStatus: Signal<SpanPropsT> = computed(() => ({
    label: this.application().status,
    Svg: SvgFillStatus,
  }));
}
