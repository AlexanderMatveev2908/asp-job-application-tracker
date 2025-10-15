import { HttpParams } from '@angular/common/http';
import { OptToastApiT } from '../etc/types';
import { FormPrs } from '@/core/lib/data_structure/form_parser';
import { ErrApi } from '@/core/lib/err';

export class ArgsApi {
  private readonly _url: string = '';
  private _params: HttpParams | null = null;
  private _optToast: OptToastApiT | null = null;
  private _body: Record<string, object> | FormData | null = null;

  constructor(url: string) {
    this._url = url;
  }

  private parseQuery(query: Record<string, unknown>): HttpParams {
    if (!query) throw new ErrApi('invalid arg parseQuery');
    return new HttpParams({ fromString: FormPrs.genParamsURL(query) });
  }

  private ifOptToastEmpty(): void {
    if (!this._optToast) this._optToast = {} as OptToastApiT;
  }

  public static withURL(url: string): ArgsApi {
    return new ArgsApi(url);
  }

  public query(query: Record<string, object>): ArgsApi {
    this._params = this.parseQuery(query);
    return this;
  }

  public body(body: Record<string, object>): ArgsApi {
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

  public getOptToast(): OptToastApiT | null {
    return this._optToast;
  }

  public httpOptions(): Record<string, unknown> {
    const options =
      !this._body || this._body instanceof FormData
        ? {}
        : { headers: { 'Content-Type': 'application/json' } };

    return options;
  }
}
