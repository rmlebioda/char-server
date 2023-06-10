import { Injectable } from '@angular/core';
import {BehaviorSubject, defer, finalize, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private IsSpinnerActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public IsSpinnerActive: Observable<boolean>;

  constructor() {
    this.IsSpinnerActive = this.IsSpinnerActiveSubject.asObservable();
  }

  enable() {
    this.IsSpinnerActiveSubject.next(true);
  }

  disable() {
    this.IsSpinnerActiveSubject.next(false);
  }

  spinForObservable<T>(observable: Observable<T>) {
    return defer(() => {
      this.enable();
      return observable
        .pipe(
          finalize(() => this.disable())
        )
    });
  }
}
