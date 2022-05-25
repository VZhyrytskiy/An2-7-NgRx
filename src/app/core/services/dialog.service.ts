import { Injectable } from '@angular/core';
import { type Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');
    return of(confirmation);
  }
}
