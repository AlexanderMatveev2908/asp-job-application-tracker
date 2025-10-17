import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RootUiSvc } from './root_ui';
import { Prs } from '../lib/data_structure/formatters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormFieldsSvc extends RootUiSvc {
  private labelOf(arg: { name: string; label?: string }): string {
    return arg?.label ?? Prs.txtOfCamelCase(arg.name, { titleCase: true });
  }

  public txtFieldOf(arg: Partial<TxtFieldT> & { name: string }): TxtFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      label,
      place: label + '...',
      type: arg.type ?? 'text',
    });
  }

  public checkFieldOf(arg: Partial<CheckFieldT> & { name: string }): CheckFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      label,
      type: arg?.type ?? 'radio',
    });
  }
}
