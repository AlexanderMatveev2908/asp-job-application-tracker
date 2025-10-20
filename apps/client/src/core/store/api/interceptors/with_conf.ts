import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ConfApiT, HttpMethod } from '../etc/types';
import { inject } from '@angular/core';
import { ConfApiSvc } from '../etc/conf_api';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';
import { ApiShape, HttpResT } from '../etc/api_shape';

const getDataSent = (req: HttpRequest<unknown>): Record<string, unknown> | null => {
  let dataSent: Record<string, unknown> | null;
  if (['GET', 'DELETE'].some((str: string) => str === req.method)) dataSent = null;
  else dataSent = req.body as Record<string, unknown> | null;

  return dataSent;
};

const getParams = (req: HttpRequest<unknown>): Record<string, unknown> | null => {
  const reqParams: HttpParams = req.params;
  const params: Record<string, unknown> = {};
  for (const k of reqParams.keys()) params[k] = reqParams.get(k);

  return ShapeCheck.hasObjData(params) ? params : null;
};

const mng = (
  req: HttpRequest<unknown>,
  e: HttpEvent<unknown> | HttpErrorResponse,
  confApi: ConfApiSvc
): void => {
  if (!ApiShape.isHttpRes(e)) return;
  const res: HttpResT = e as HttpResT;

  const urlReq: string = (res.url ?? '').split('?')[0];
  const conf: ConfApiT = {
    url: urlReq,
    method: req.method as HttpMethod,
    responseType: res.headers.get('Content-Type'),
    requestType: req.headers.get('Content-Type'),
    accessToken: req.headers.get('Authorization'),
    params: getParams(req),
    body: getDataSent(req),
  };

  confApi.set(conf);
};

export const addConfApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: ConfApiSvc = inject(ConfApiSvc);

  return next(req).pipe(
    tap({
      next: (e: HttpEvent<unknown>) => mng(req, e, confApi),
      error: (e: HttpEvent<unknown>) => mng(req, e, confApi),
    })
  );
};
