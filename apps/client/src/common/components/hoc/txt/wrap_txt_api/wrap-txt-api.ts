import { SpinTxt } from '@/common/components/spins/spin_txt/spin-txt';
import { SpinTxtClsT } from '@/common/types/css';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-wrap-txt-api',
  imports: [SpinTxt, NgClass],
  templateUrl: './wrap-txt-api.html',
  styleUrl: './wrap-txt-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapTxtApi extends UseWrapApiDir {
  public readonly spinSizeT: InputSignal<SpinTxtClsT> = input.required();

  public readonly css: Signal<string> = computed(() => `wrap__${this.spinSizeT()}`);
}
