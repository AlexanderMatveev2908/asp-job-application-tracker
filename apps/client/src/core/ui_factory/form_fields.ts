import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RootUiCls } from './root_ui';
import { Prs } from '../lib/data_structure/formatters';

export class FormFieldsCls extends RootUiCls {
  private static labelOf(arg: { name: string; label?: string }): string {
    return arg?.label ?? Prs.txtOfCamelCase(arg.name, { titleCase: true });
  }

  public static txtFieldOf(arg: Partial<TxtFieldT> & { name: string }): TxtFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      label,
      place: label + '...',
      type: arg.type ?? 'text',
    });
  }

  public static checkFieldOf(arg: Partial<CheckFieldT> & { name: string }): CheckFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      label,
      type: arg?.type ?? 'radio',
    });
  }
}
