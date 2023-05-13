import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {RealEsrganHelpResponse} from "../models/real-esrgan-help-response";

@Injectable({
  providedIn: 'root'
})
export class ImageUpscalingService {

  constructor(private http: HttpClient) { }

  getHelp(): Observable<string> {
    return this.http.get<RealEsrganHelpResponse>("/api/upscaling/real-esrgan/help")
      .pipe(
        shareReplay(),
        map((response) => response.message)
      );
  }
}
