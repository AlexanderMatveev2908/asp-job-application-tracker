export class RefApi {
  private _hasRun: boolean = false;

  public run(): void {
    this._hasRun = true;
  }

  public get hasRun(): boolean {
    return this._hasRun;
  }
}
