import { RecErrsFieldT } from '@/common/types/forms';
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
  selector: 'app-form-field-err',
  imports: [NgClass],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr {
  public readonly recErrs: InputSignal<RecErrsFieldT> = input.required();

  public readonly twd: Signal<string> = computed(() =>
    this.recErrs().curr ? 'translate-y-[-100%] opacity-1' : 'translate-y-[25px] opacity-0'
  );
}
