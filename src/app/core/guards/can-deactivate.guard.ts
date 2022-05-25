import { Injectable } from '@angular/core';
import type { CanDeactivate, UrlTree } from '@angular/router';
import type { Observable } from 'rxjs';

import type { CanComponentDeactivate } from './../interfaces/can-component-deactivate.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanDeactivate Guard is called');
    return component.canDeactivate?.() ?? true;
  }
}
