import {Injectable} from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {Torrent} from "../models/torrent";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QbtTorrentService {

  constructor(
    private http: HttpClient
  ) {
  }

  list(): Observable<Torrent[]> {
    return this.http.get<Torrent[]>("/api/qbt/list")
      .pipe(
        shareReplay()
      )
  }

  add(magnet: string): Observable<object> {
    return this.http.post('/api/qbt/add/url', {url: magnet})
      .pipe(
        shareReplay()
      );
  }

  delete(hash: string, withFiles: boolean): Observable<object> {
    return this.http.request('delete', '/api/qbt/delete/' + hash, {body: {withFiles: withFiles}})
      .pipe(
        shareReplay()
      );
  }
}
