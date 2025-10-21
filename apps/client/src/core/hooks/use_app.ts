import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from './use_platform';

@Injectable()
export abstract class UseApp {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
}
