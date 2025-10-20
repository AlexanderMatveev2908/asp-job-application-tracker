import { HttpParams } from '@angular/common/http';
import { OptErrApiT, OptToastApiT } from '../types';
import { FormPrs } from '@/core/lib/data_structure/form_prs';
import { ErrApp } from '@/core/lib/err';
import { None, Nullable, OrNone } from '@/common/types/etc';

export class ArgsApi {
  private readonly _url: string = '';
  private _params: Nullable<HttpParams> = null;
  private _optToast: Nullable<Partial<OptToastApiT>> = null;
  private _optErr: Nullable<Partial<OptErrApiT>> = null;
  private _body: Nullable<Record<string, unknown> | FormData> = null;

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

  public getParamsOr(ifEmpty: None = null): OrNone<HttpParams> {
    return !this._params ? ifEmpty : this._params;
  }

  public getBody(): Nullable<Record<string, unknown> | FormData> {
    return this._body;
  }

  public getOptToast(): Nullable<Partial<OptToastApiT>> {
    return this._optToast;
  }

  public getOptErr(): Nullable<Partial<OptErrApiT>> {
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
