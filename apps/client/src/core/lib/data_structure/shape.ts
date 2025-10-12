export class ShapeCheck {
  public static isStr(str: unknown): boolean {
    return typeof str === 'string' && !!str.trim().length;
  }

  public static isObj(arg: unknown): boolean {
    return typeof arg === 'object' && arg !== null;
  }
}
