import {Component} from '@angular/core';
import {BehaviorSubject, catchError, finalize, interval, Observable, pipe, Subscription, throwError} from "rxjs";
import {SpinnerService} from "../../services/spinner.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {Torrent} from "../../models/torrent";
import {MatDialog} from "@angular/material/dialog";
import {TorrentAddDialogComponent} from "../torrent-add-dialog/torrent-add-dialog.component";
import {QbtTorrentService} from "../../services/qbt-torrent.service";
import {TorrentDeleteDialogComponent} from "../torrent-delete-dialog/torrent-delete-dialog.component";

@Component({
  selector: 'app-torrent.ts',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent {


  public torrents: Observable<Torrent[]>;
  private torrentSubject: BehaviorSubject<Torrent[]> = new BehaviorSubject<Torrent[]>([]);
  private refreshTorrentListInterval = interval(15000);
  private refreshTorrentListSubscription: Subscription;

  public displayedColumns = ['name', 'size', 'progress', 'addedOn', 'delete'];

  constructor(
    private dialog: MatDialog,
    private qbtTorrentService: QbtTorrentService,
    private spinnerService: SpinnerService,
    private snackBarService: SnackBarService
  ) {
    this.torrents = this.torrentSubject.asObservable();

    this.refreshTorrentListSubscription = this.refreshTorrentListInterval.subscribe(val => {
      this.refreshTorrents();
    });

    this.refreshTorrents();
  }

  private subscribeToTorrentList() {
    this.refreshTorrentListSubscription = this.refreshTorrentListInterval.subscribe(val => {
      this.refreshTorrents();
    });
  }

  private unsubscribeToTorrentList() {
    this.refreshTorrentListSubscription.unsubscribe();
  }

  private refreshTorrents() {
    console.log("refresh called");
    this.spinnerService.spinForObservable(this.qbtTorrentService.list())
      .pipe(
        catchError((error) => {
          this.snackBarService.show("Failed to fetch torrent list");
          throw error;
        }))
      .subscribe((torrents) => {
        console.log(torrents);
        this.torrentSubject.next(torrents);
      });
  }

  deleteTorrent(torrent: Torrent) {
    this.unsubscribeToTorrentList();

    const dialogRef = this.dialog.open(TorrentDeleteDialogComponent, {
      data: {torrentHash: torrent.hash}
    });

    dialogRef.afterClosed()
      .subscribe((result: Observable<object>) => {
        if (!result) return;
        this.handleBlockingObservable(result, "Failed to delete torrent due to unknown error", "Torrent deleted");
      })
  }

  addTorrent() {
    this.unsubscribeToTorrentList();

    const dialogRef = this.dialog.open(TorrentAddDialogComponent);

    dialogRef.afterClosed()
      .subscribe((result: Observable<object>) => {
        if (!result) return;
        this.handleBlockingObservable(result, "Failed to add torrent due to unknown error", "Added new torrent");
      })
  }

  private handleBlockingObservable<T>(obs: Observable<T>, successMsg: string, errorMsg: string) {
    let subscription = this.spinnerService.spinForObservable(obs);
    subscription
      .pipe(
        catchError((error) => {
          console.log(error);
          this.snackBarService.show(successMsg);
          throw error;
        })
      )
      .subscribe(result => {
        this.refreshTorrents();
        this.subscribeToTorrentList();
        this.snackBarService.show(errorMsg);
      })
  }
}
