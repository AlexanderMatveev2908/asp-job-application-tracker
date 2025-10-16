export class ErrApp extends Error {
  private readonly msg: string;
  private readonly status: number;

  constructor(msg: string);
  constructor(msg: string, status: number);

  constructor(msg: string, status?: number) {
    super(msg);
    this.msg = `❌ ${msg}`;
    // eslint-disable-next-line no-magic-numbers
    this.status = status ?? 500;
  }

  public getMsg(): string {
    return this.msg;
  }

  public getStatus(): number {
    return this.status;
  }
}
