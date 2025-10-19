import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { WithSwapPortal } from '@/core/directives/with_swap_portal';
import { RecCoordsT, UsePortal } from '@/core/hooks/use_portal';

@Component({
  selector: 'app-cpy-paste',
  imports: [Portal],
  templateUrl: './cpy-paste.html',
  styleUrl: './cpy-paste.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpyPaste extends WithSwapPortal {
  // ? svc
  private readonly usePlatForm: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly txt: InputSignal<string | null> = input.required();

  // ? derived
  public readonly cpyPasteCoords: Signal<Partial<RecCoordsT>> = computed(() => ({
    top: this.coords()?.top,
    left: UsePortal.patchCoord(
      this.coords()?.left,
      // eslint-disable-next-line no-magic-numbers
      (v: number) => v + UsePortal.coordToInt(this.coords()?.with) / 2
    ),
  }));
}
