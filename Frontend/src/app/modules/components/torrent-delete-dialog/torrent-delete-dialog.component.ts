import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QbtTorrentService} from "../../services/qbt-torrent.service";

export interface TorrentDeleteDialogData {
  torrentHash: string
}

@Component({
  selector: 'app-torrent-delete-dialog',
  templateUrl: './torrent-delete-dialog.component.html',
  styleUrls: ['./torrent-delete-dialog.component.scss']
})
export class TorrentDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TorrentDeleteDialogData,
    private dialogRef: MatDialogRef<TorrentDeleteDialogComponent>,
    private qbtTorrentService: QbtTorrentService
  ) {
  }

  onDelete() {
    this.dialogRef.close(this.qbtTorrentService.delete(this.data.torrentHash, false));
  }

  onDeleteWithFiles() {
    this.dialogRef.close(this.qbtTorrentService.delete(this.data.torrentHash, true));
  }
}
