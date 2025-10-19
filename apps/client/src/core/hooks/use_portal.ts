import { ElDomT, RefDomT } from '@/common/types/etc';
import { ErrApp } from '../lib/err';

export interface RecCoordsT {
  top: string | null;
  left: string | null;
  right: string | null;
  bottom: string | null;
  with: string | null;
  height: string | null;
}

export class UsePortal {
  // | most of cases i will just use directly calculated coords
  // | so is faster to receive them as css property
  // | just in rare cases i will need to adjust size using integer values

  public static coordsOf(refDom: RefDomT): RecCoordsT | null {
    const elDOM: ElDomT = refDom?.nativeElement;
    if (!elDOM) return null;

    const coordsDOM: DOMRect = elDOM.getBoundingClientRect();

    return {
      top: `${coordsDOM.top}px`,
      left: `${coordsDOM.right - coordsDOM.width}px`,
      right: `${coordsDOM.left}px`,
      bottom: `${window.innerHeight - coordsDOM.bottom}px`,
      with: `${coordsDOM.width}px`,
      height: `${coordsDOM.height}px`,
    };
  }

  public static coordToInt(arg: string | null | undefined): number {
    if (!arg) throw new ErrApp('expected value to parse as int');

    const splitted: string[] = arg.split('px');
    const int: number = +splitted[0];

    return int;
  }

  public static patchCoord(arg: string | null | undefined, cb: (v: number) => number): string {
    const int: number = this.coordToInt(arg);

    return `${cb(int)}px`;
  }
}
