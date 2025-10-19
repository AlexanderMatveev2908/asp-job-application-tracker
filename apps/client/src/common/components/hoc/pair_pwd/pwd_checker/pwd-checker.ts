import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { ConfSwapT } from '@/core/directives/with_swap/etc/types';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { RecCoordsT, UsePortal } from '@/core/hooks/use_portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';

@Component({
  selector: 'app-pwd-checker',
  imports: [Portal],
  templateUrl: './pwd-checker.html',
  styleUrl: './pwd-checker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdChecker implements AfterViewInit {
  // ? svc
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal props
  public readonly isFocused: InputSignal<boolean> = input.required();
  public readonly pwdFieldRef: InputSignal<FormFieldTxt> = input.required();
  public readonly confSwap: InputSignal<ConfSwapT | null> = input<ConfSwapT | null>(null);

  // ? local state
  public readonly coords: WritableSignal<RecCoordsT | null> = signal<RecCoordsT | null>(null);

  ngAfterViewInit(): void {
    this.usePlatform.inCtx(() => {
      effect(() => {
        this.coords.set(UsePortal.coordsOfRef(this.pwdFieldRef().inputTxt));

        console.log(this.coords());
      });
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(UsePortal.coordsOfRef(this.pwdFieldRef().inputTxt));
  }
}
