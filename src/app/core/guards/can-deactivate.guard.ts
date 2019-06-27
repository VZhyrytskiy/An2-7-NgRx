import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from './../interfaces/can-component-deactivate.interface';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanDeactivate Guard is called');
    return component.canDeactivate();
  }
}
