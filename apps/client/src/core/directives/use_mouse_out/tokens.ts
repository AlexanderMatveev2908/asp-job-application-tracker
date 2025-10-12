import { InjectionToken, Signal } from '@angular/core';

export const USE_MOUSE_OUT__IS_OPEN = new InjectionToken<Signal<boolean>>('useMouseOutOpen');
export const USE_MOUSE_OUT__CB = new InjectionToken<() => void>('useMouseOutClose');
