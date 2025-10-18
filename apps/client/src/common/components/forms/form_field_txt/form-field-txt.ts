import { TxtFieldT } from '@/common/types/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { RefDomT } from '@/common/types/etc';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormFieldErr],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt implements OnInit, AfterViewInit {
  public readonly ctrl: InputSignal<FormControl<unknown>> = input.required();
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly focusOnMount: InputSignal<boolean> = input(false);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  @ViewChild('inputTxt') inputTxt!: RefDomT;

  public val!: Signal<string>;

  ngOnInit(): void {
    const c = this.ctrl();

    this.usePlatform.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value as string,
      });

      // effect(() => {
      //   void this.val();
      // });
    });
  }

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      if (!this.focusOnMount()) return;
      const el = this.inputTxt?.nativeElement;
      if (!el) return;

      el.focus();
    });
  }
}
