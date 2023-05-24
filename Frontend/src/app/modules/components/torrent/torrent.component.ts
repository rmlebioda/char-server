import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TorrentAddRequest} from "../../models/torrent-add-request";
import {TorrentService} from "../../services/torrent.service";
import {catchError, finalize, throwError} from "rxjs";
import {SpinnerService} from "../../services/spinner.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent {

  public AddTorrentErrorMessage: string = "";

  public magnet = new FormControl({value: '', disabled: false}, [Validators.required]);

  public torrentForm: FormGroup = new FormGroup({
    magnet: this.magnet
  });

  constructor(
    private torrentService: TorrentService,
    private spinnerService: SpinnerService,
    private snackBarService: SnackBarService
  ) {
  }

  onSubmit() {
    if (!this.torrentForm.valid) {
      return;
    }

    let request: TorrentAddRequest = {
      magnet: this.magnet.value!
    };

    let observable = this.torrentService
      .add(request);

    let spinnerObservable = this.spinnerService.spinForObservable(observable);

    this.AddTorrentErrorMessage = "";
    let subscription = spinnerObservable
      .pipe(
        catchError((error) => {
          this.AddTorrentErrorMessage = "Failed to add magnet due to error: " + JSON.stringify(error)
          return throwError(error);
        })
      )
      .subscribe(
        (response) => {
          this.snackBarService.show("Added new magnet");
          this.magnet.setValue("");
        }
      );
  }

}
