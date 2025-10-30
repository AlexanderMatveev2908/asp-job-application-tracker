import { SvgFillApplyJob } from '@/common/components/svgs/fill/apply_job/apply-job';
import { SvgFillStatus } from '@/common/components/svgs/fill/status/status';
import { CheckBoxFieldT, TxtFieldArrayT } from '@/common/types/forms';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { SearchBarFilterT } from '@/layout/search_bar/etc/ui_fkt';

export class SearchApplicationsUiFkt extends FormFieldsUiFkt {
  public static readonly companyName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'companyName', field: 'txtInputs' });

  public static readonly positionName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'positionName', field: 'txtInputs' });

  public static readonly txtInputs: () => TxtFieldArrayT[] = () => [
    this.companyName(),
    this.positionName(),
  ];

  public static readonly other: () => SearchBarFilterT = () =>
    this.withID({
      field: 'other',
      label: 'Other',
      Svg: SvgFillApplyJob,
      fields: Array.from({ length: 25 }, (_: undefined, i: number) =>
        this.checkBoxFieldOf({ name: 'other', label: 'Other', val: i + '' })
      ),
    });

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

  public static readonly filters: () => SearchBarFilterT[] = () => [this.status(), this.other()];
}
