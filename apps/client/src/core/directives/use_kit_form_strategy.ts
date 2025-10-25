import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { UseKitFormSvc } from '../hooks/kits/kit_form/0.use_kit_form';
import { Observable } from 'rxjs';

@Directive()
export abstract class UseKitFormStrategyDir extends UseKitFormSvc {
  public readonly testId: InputSignal<string> = input.required();
  public readonly strategy: InputSignal<(data: unknown) => Observable<unknown>> = input.required();
  public readonly useFullPage: InputSignal<boolean> = input.required();

  public readonly cssCls: Signal<string> = computed(() =>
    this.useFullPage() ? 'app__form__content_pad' : 'app__form__content_no_pad'
  );
}
