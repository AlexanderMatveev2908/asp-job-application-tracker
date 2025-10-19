export class PwdCheckerReg {
  public static readonly UPPER: RegExp = /[A-Z]/;
  public static readonly LOWER: RegExp = /[a-z]/;
  public static readonly NUM: RegExp = /\d/;
  public static readonly SYMBOL: RegExp = /[\W_]/;

  public static hasUpper(arg: string): boolean {
    return this.UPPER.test(arg);
  }
  public static hasLower(arg: string): boolean {
    return this.LOWER.test(arg);
  }
  public static hasNum(arg: string): boolean {
    return this.NUM.test(arg);
  }
  public static hasSymbol(arg: string): boolean {
    return this.SYMBOL.test(arg);
  }
}
