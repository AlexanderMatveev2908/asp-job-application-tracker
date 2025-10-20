import { ElDomT, RefDomT } from '@/common/types/etc';

export class FocusDOM {
  public static byDataField(field: string | null): void {
    const elDOM: HTMLElement | null = document.querySelector(`[data-field=${field}]`);
    if (!elDOM) return;

    elDOM.focus();
  }

  public static bySwap(fields: string[], target: number): void {
    let i: number = 0;

    do {
      if (i !== target) {
        i++;
        continue;
      }

      this.byDataField(fields[i]);
      break;
    } while (i < fields.length);
  }

  public static ifExists(refDOM: RefDomT): void {
    const elDOM: ElDomT = refDOM?.nativeElement;
    if (!elDOM) return;

    elDOM.focus();
  }
}
