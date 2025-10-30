import { CheckBoxFieldT } from '@/common/types/forms';
import { Type } from '@angular/core';

export interface SearchBarFilterT {
  id: string;
  field: string;
  label: string;
  Svg: Type<unknown>;
  fields: CheckBoxFieldT[];
}

export class SearchBarUiFkt {}
