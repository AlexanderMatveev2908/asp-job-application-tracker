import { Nullable } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import { BaseSearchBarFormT } from '@/core/paperwork/etc/search_bar';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SvgStrokeSearchPlus } from '@/common/components/svgs/stroke/search_plus/search-plus';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-search-bar-drop-add-field',
  imports: [NgComponentOutlet],
  templateUrl: './search-bar-drop-add-field.html',
  styleUrl: './search-bar-drop-add-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarDropAddField<T> {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();
  public readonly txtInputsAvailable: InputSignal<TxtFieldArrayT[]> = input.required();

  // ? local state
  public readonly isOpen: WritableSignal<boolean> = signal(false);

  // ? helpers
  public readonly setIsOpen: (v: boolean) => void = (v: boolean) => this.isOpen.set(v);

  // ? props span drop-abs
  public readonly SvgDrop: Type<unknown> = SvgStrokeSearchPlus;
}
