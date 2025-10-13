/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@angular/core';
import { AppEventT } from '../../../../types/events';
import { BaseLinkFields } from '../../../../types/links';

export interface LinkShadowConfT extends BaseLinkFields {
  Svg?: Type<any>;
  eventT: AppEventT;
}
