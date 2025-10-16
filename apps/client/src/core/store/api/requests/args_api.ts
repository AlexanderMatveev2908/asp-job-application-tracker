import { HttpParams } from '@angular/common/http';
import { OptErrApi, OptToastApiT } from '../etc/types';
import { FormPrs } from '@/core/lib/data_structure/form_parser';
import { ErrApp } from '@/core/lib/err';

export class ArgsApi {
  private readonly _url: string = '';
  private _params: HttpParams | null = null;
  private _optToast: Partial<OptToastApiT> | null = null;
  private _optErr: Partial<OptErrApi> | null = null;
  private _body: Record<string, unknown> | FormData | null = null;

  constructor(url: string) {
    this._url = url;
  }

  private parseQuery(query: Record<string, unknown>): HttpParams {
    if (!query) throw new ErrApp('invalid arg parseQuery');
    return new HttpParams({ fromString: FormPrs.genParamsURL(query) });
  }

  private ifOptToastEmpty(): void {
    if (!this._optToast) this._optToast = {};
  }
  private ifOptErrEmpty(): void {
    if (!this._optErr) this._optErr = {};
  }

  public static withURL(url: string): ArgsApi {
    return new ArgsApi(url);
  }

  public query(query: Record<string, unknown>): ArgsApi {
    this._params = this.parseQuery(query);
    return this;
  }

  public body(body: Record<string, unknown>): ArgsApi {
    this._body = body;
    return this;
  }

  public toastOnOk(): ArgsApi {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = true;
    return this;
  }

  public toastOnErr(): ArgsApi {
    this.ifOptToastEmpty();
    this._optToast!.toastErr = true;
    return this;
  }

  public toastOnFulfilled(): ArgsApi {
    this.ifOptToastEmpty();
    this._optToast!.toastOk = true;
    this._optToast!.toastErr = true;
    return this;
  }

  public pushOnErr(): ArgsApi {
    this.ifOptErrEmpty();
    this._optErr!.pushOnErr = true;
    return this;
  }

  public pushOnStatus(codes: number[]): ArgsApi {
    this.ifOptErrEmpty();
    this._optErr!.pushOnStatus = codes;
    return this;
  }

  public freeze(): Readonly<this> {
    return Object.freeze(this);
  }

  public getUrl(): string {
    return this._url;
  }

  public getParams(isEmpty: null | undefined = null): HttpParams | null | undefined {
    return !this._params ? isEmpty : this._params;
  }

  public getBody(): Record<string, unknown> | FormData | null {
    return this._body;
  }

  public getOptToast(): Partial<OptToastApiT> | null {
    return this._optToast;
  }

  public getOptErr(): Partial<OptErrApi> | null {
    return this._optErr;
  }

  public httpOptions(): Record<string, unknown> {
    const options: Record<string, unknown> =
      !this._body || this._body instanceof FormData
        ? {}
        : { headers: { 'Content-Type': 'application/json' } };

    return options;
  }
}
