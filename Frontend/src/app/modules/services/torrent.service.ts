import { Injectable } from '@angular/core';
import {RealEsrganHelpResponse} from "../models/real-esrgan-help-response";
import {map, Observable, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TorrentAddRequest} from "../models/torrent-add-request";
import {Torrent} from "../models/torrent";

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  constructor(
    private http: HttpClient
  ) { }

  add(request: TorrentAddRequest) {
    return this.http.post("/api/torrent/add", request)
      .pipe(
        shareReplay()
      );
  }
}
