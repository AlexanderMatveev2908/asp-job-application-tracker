import { ElDomT, Nullable, RefDomT } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import { BaseSearchBarFormT } from '@/layout/search_bar/etc/paperwork';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  Signal,
  signal,
  Type,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SvgStrokeSearchPlus } from '@/common/components/svgs/stroke/search_plus/search-plus';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { v4 } from 'uuid';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

@Component({
  selector: 'app-search-bar-drop-add-field',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './search-bar-drop-add-field.html',
  styleUrl: './search-bar-drop-add-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarDropAddField<T> {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();
  public readonly txtInputsAvailable: InputSignal<TxtFieldArrayT[]> = input.required();

  // ? derived
  public readonly txtFieldsLessPresent: Signal<TxtFieldArrayT[]> = computed(() => {
    const existing: TxtFieldArrayT[] = (this.formVal()?.txtInputs ?? []).filter(
      (f: TxtFieldArrayT) => LibShapeCheck.hasObjData(f)
    );

    const namesIn: Set<string> = new Set<string>(existing.map((f: TxtFieldArrayT) => f.name));

    return this.txtInputsAvailable().filter((f: TxtFieldArrayT) => !namesIn.has(f.name));
  });

  // ? local state
  public readonly isOpen: WritableSignal<boolean> = signal(false);

  // ? helpers
  public readonly setIsOpen: (v: boolean) => void = (v: boolean) => this.isOpen.set(v);
  public toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  // ? children
  @ViewChild('dropRef') dropRef: RefDomT;
  @ViewChild('dropBtnRef') dropBtnRef: RefDomT;

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.isOpen()
      ? 'opacity-100 translate-y-[120%] pointer-events-auto'
      : 'opacity-0 translate-y-0 pointer-events-none'
  );

  // ? props span drop-abs
  public readonly SvgDrop: Type<unknown> = SvgStrokeSearchPlus;

  // ? listeners

  public addField(f: TxtFieldArrayT): void {
    const txtInputs: FormArray = this.form().get('txtInputs') as FormArray;

    txtInputs.push(
      new FormControl({
        ...f,
        id: v4(),
      })
    );

    this.setIsOpen(false);
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const drop: ElDomT = this.dropRef?.nativeElement;
    const dropBtn: ElDomT = this.dropBtnRef?.nativeElement;

    const target: Nullable<HTMLElement> = e.target as HTMLElement;

    if ([drop, dropBtn, target].some((el: ElDomT | HTMLElement) => !el)) return;

    if (this.isOpen() && ![drop, dropBtn].some((el: ElDomT) => el!.contains(target)))
      this.isOpen.set(false);
  }
}
