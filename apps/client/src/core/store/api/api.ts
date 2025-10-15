import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResApiT } from './etc/types';
import { FormPrs } from '@/core/lib/data_structure/form_parser';

@Injectable({
  providedIn: 'root',
})
export class ApiSvc {
  private readonly http: HttpClient = inject(HttpClient);

  // ? utils only
  private parseQuery(query: Record<string, unknown> | null): HttpParams | undefined {
    const params: HttpParams | undefined = query
      ? new HttpParams({ fromString: FormPrs.genParamsURL(query) })
      : undefined;

    return params;
  }

  private extractOptions(body: Record<string, unknown> | FormData): Record<string, unknown> {
    const options =
      body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } };

    return options;
  }

  // ? request handlers
  private _get<T>(endpoint: string, query: Record<string, unknown> | null): Observable<ResApiT<T>> {
    return this.http.get<ResApiT<T>>(endpoint, {
      params: this.parseQuery(query),
    });
  }

  public get<T>(endpoint: string): Observable<ResApiT<T>> {
    return this._get(endpoint, null);
  }
  public getWithQuery<T>(
    endpoint: string,
    params: Record<string, unknown>
  ): Observable<ResApiT<T>> {
    return this._get(endpoint, params);
  }

  public post<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData
  ): Observable<ResApiT<T>> {
    return this.http.post<ResApiT<T>>(endpoint, body, this.extractOptions(body));
  }

  public put<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData
  ): Observable<ResApiT<T>> {
    return this.http.put<ResApiT<T>>(endpoint, body, this.extractOptions(body));
  }

  public patch<T>(
    endpoint: string,
    body: Record<string, unknown> | FormData
  ): Observable<ResApiT<T>> {
    return this.http.patch<ResApiT<T>>(endpoint, body, this.extractOptions(body));
  }

  private _delete<T>(
    endpoint: string,
    query: Record<string, unknown> | null
  ): Observable<ResApiT<T>> {
    return this.http.delete<ResApiT<T>>(endpoint, {
      params: this.parseQuery(query),
    });
  }

  public delete<T>(endpoint: string): Observable<ResApiT<T>> {
    return this._delete(endpoint, null);
  }

  public deleteWithQuery<T>(
    endpoint: string,
    query: Record<string, unknown>
  ): Observable<ResApiT<T>> {
    return this._delete(endpoint, query);
  }
}
