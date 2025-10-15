import { Reg } from '../paperwork/reg';
import { Prs } from './data_structure/formatters';
import { ShapeCheck } from './data_structure/shape';
import { Stack } from './stack';

export class Log {
  private static _log(title: string | null, ...args: unknown[]): void {
    // ? 0 private log
    // ? 1 public log
    // ? 2 real caller
    // eslint-disable-next-line no-magic-numbers
    const caller: string = Stack.getCallerLess(2);

    const existsTtl: boolean = ShapeCheck.isStr(title);
    const ttl: string = existsTtl ? title! : caller;
    let emoji: string = '';
    if (existsTtl) {
      const firstPart: string = ttl.split(' ')[0];
      if (!Reg.isEmoji(firstPart)) emoji = '📌';
    } else {
      emoji = '🧩';
    }

    console.log('\n');
    console.group(
      `${emoji} ${ttl}${existsTtl ? ` • 🧩 ${caller}` : ''}\n⏰ ${Prs.devDate(Date.now())}`
    );

    for (const el of args) console.log(el);

    console.groupEnd();
    console.log('\n');
  }

  public static logTtl(title: string, ...args: unknown[]): void {
    this._log(title, ...args);
  }

  public static log(...args: unknown[]): void {
    this._log(null, ...args);
  }
}
