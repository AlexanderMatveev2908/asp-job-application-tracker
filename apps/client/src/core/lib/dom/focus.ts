export class FocusDOM {
  public static focusWhen(fields: string[], target: number): void {
    let i: number = 0;

    do {
      if (i !== target) {
        i++;
        continue;
      }

      const elDOM: HTMLElement | null = document.querySelector(`[data-field=${fields[i]}]`);
      if (!elDOM) return;

      elDOM.focus();
      break;
    } while (i < fields.length);
  }
}
