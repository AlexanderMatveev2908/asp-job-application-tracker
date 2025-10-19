export class Rand {
  public static idxIn(n: number): number {
    // eslint-disable-next-line no-magic-numbers
    const MAX_UI_32_VAL: number = 2 ** 32;

    const limit: number = MAX_UI_32_VAL - (MAX_UI_32_VAL % n);
    const buf: Uint32Array = new Uint32Array(1);

    let v: number;
    do {
      crypto.getRandomValues(buf);
      v = buf[0];
    } while (v >= limit);

    return v % n;
  }

  public static shuffle(arg: string): string {
    const arr: string[] = arg.split('');

    let i: number = arg.length - 1;

    while (i > 0) {
      const j: number = this.idxIn(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i--;
    }

    return arr.join('');
  }
}
