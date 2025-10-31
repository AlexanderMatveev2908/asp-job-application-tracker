import { SvgFillSandglass } from '@/common/components/svgs/fill/sandglass/sandglass';
import { SvgFillStatus } from '@/common/components/svgs/fill/status/status';
import { CheckBoxFieldT, TxtFieldArrayT } from '@/common/types/forms';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { SearchBarFilterT, SearchBarSorterT } from '@/layout/search_bar/etc/ui_fkt';

export class SearchApplicationsUiFkt extends FormFieldsUiFkt {
  public static readonly companyName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'companyName', field: 'txtInputs' });

  public static readonly positionName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'positionName', field: 'txtInputs' });

  public static readonly txtInputs: () => TxtFieldArrayT[] = () => [
    this.companyName(),
    this.positionName(),
  ];

  private static getStatuses(): CheckBoxFieldT[] {
    return Object.values(ApplicationStatusT).map(
      (st: string): CheckBoxFieldT =>
        this.checkBoxFieldOf({
          name: 'status',
          type: 'checkbox',
          label: LibPrs.snakeToTxt(st),
          val: st,
        })
    );
  }
  public static readonly status: () => SearchBarFilterT = () =>
    this.withID({
      field: 'status',
      label: 'Status',
      Svg: SvgFillStatus,
      fields: this.getStatuses(),
    });

  public static readonly filters: () => SearchBarFilterT[] = () => [this.status()];

  public static readonly sorters: () => SearchBarSorterT[] = () =>
    this.arrWithIDs([
      {
        field: 'createdAt',
        label: 'Created At',
        Svg: SvgFillSandglass,
      },
      {
        field: 'updatedAt',
        label: 'Updated At',
        Svg: SvgFillSandglass,
      },
      {
        field: 'appliedAt',
        label: 'Applied At',
        Svg: SvgFillSandglass,
      },
    ]);
}
