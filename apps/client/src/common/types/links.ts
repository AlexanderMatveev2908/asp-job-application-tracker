import { Type } from '@angular/core';

export interface BaseLinkFields {
  path: string;
  label: string;
}

export interface LinkT extends BaseLinkFields {
  id: string;
  Svg: Type<unknown>;
}
