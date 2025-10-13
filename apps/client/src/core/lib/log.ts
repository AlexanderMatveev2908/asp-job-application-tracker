/* eslint-disable complexity */
import { Prs } from './data_structure/formatters';
import { ShapeCheck } from './data_structure/shape';

export class Log {
  private static _log(title: string | null, ...args: unknown[]): void {
    const err: Error = new Error();
    const traces: string[] | undefined = err.stack?.split('\n');

    let clsCaller = 'unknown caller';
    for (const t of traces ?? []) {
      let caller = '';
      if (t.includes('@')) caller = t.split('@')?.[0] ?? '';
      else if (t.includes('at')) caller = t.split('at')?.[1]?.split('.')?.[0] ?? '';

      if (
        ShapeCheck.isStr(caller) &&
        ['error', 'log'].every((str: string) => !caller.toLowerCase().includes(str))
      ) {
        clsCaller = caller.replace(/[<>/]/g, '');
        break;
      }
    }

    const existsTtl: boolean = ShapeCheck.isStr(title);
    const ttl: string = existsTtl ? title! : clsCaller;

    console.log('\n');
    console.group(
      `${existsTtl ? '📌' : '🧩'} ${ttl}${existsTtl ? ` • 🧩 ${clsCaller}` : ''}\n⏰ ${Prs.devDate(
        Date.now()
      )}`
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
