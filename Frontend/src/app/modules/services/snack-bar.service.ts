import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  show(message: string, dismissal?: string, timeoutMs: number = 3000) {
    this.snackBar.open(message, dismissal, {duration: timeoutMs});
  }
}
