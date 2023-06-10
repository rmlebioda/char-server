import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QbtTorrentService} from "../../services/qbt-torrent.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-torrent-add-dialog',
  templateUrl: './torrent-add-dialog.component.html',
  styleUrls: ['./torrent-add-dialog.component.scss']
})
export class TorrentAddDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<TorrentAddDialogComponent>,
    private qbtTorrentService: QbtTorrentService
  ) {
  }

  public magnet = new FormControl('', [Validators.required]);

  public addTorrentForm: FormGroup = new FormGroup({
    magnet: this.magnet
  });

  onSubmit() {
    if (this.addTorrentForm.invalid) return;

    let subscription = this.qbtTorrentService.add(this.magnet.value!);

    this.dialogRef.close(subscription);
  }
}
