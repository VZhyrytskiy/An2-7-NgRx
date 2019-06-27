import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  private preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
