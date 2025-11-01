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
import { SpanEventPropsT, SpanPropsT } from '@/common/components/els/span/etc/types';
import { ApplicationItemUiFkt } from './etc/ui_fkt';
import { WithIdT } from '@/common/types/etc';
import { Span } from '@/common/components/els/span/span';
import { UseDropHk } from '@/core/hooks/use_drop';
import { ApplicationStatusRow } from './status_row/application-status-row';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SvgFillFancyPen } from '@/common/components/svgs/fill/fancy_pen/fancy-pen';
import { SvgStrokeTrash } from '@/common/components/svgs/stroke/trash/trash';

@Component({
  selector: 'app-application-item',
  imports: [Span, ApplicationStatusRow, LinkShadow, UseSpanDir, BtnShadow, UseIDsDir],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
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

  public readonly spanLink: Signal<SpanEventPropsT> = computed(() => ({
    eventT: 'INFO',
    label: 'Update',
    Svg: SvgFillFancyPen,
  }));

  public readonly pathLink: Signal<string> = computed(
    () => `/job-applications/put/${this.application().id}`
  );

  public readonly deleteSpan: Signal<SpanEventPropsT> = computed(() => ({
    eventT: 'ERR',
    label: 'Delete',
    Svg: SvgStrokeTrash,
  }));
}
