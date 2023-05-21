import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {RealEsrganHelpResponse} from "../models/real-esrgan-help-response";
import {RealEsrganImageRequest} from "../models/real-esrgan-image-request";
import {RealEsrganImageResponse} from "../models/real-esrgan-image-response";
import {RealEsrganImageTaskResponse} from "../models/real-esrgan-image-task-response";

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

  upscaleImage(data: object, image: File): Observable<RealEsrganImageResponse> {
    let formData = new FormData();
    formData.append('settings', JSON.stringify(data));
    formData.append('image', image);
    return this.http.post<RealEsrganImageResponse>("/api/upscaling/real-esrgan/image", formData);
  }

  getUpscsaledImage(taskId: string): Observable<RealEsrganImageTaskResponse> {
    return this.http.get<RealEsrganImageTaskResponse>("/api/upscaling/real-esrgan/image/" + taskId);
  }

  getUpscsaledImageStatus(taskId: string): Observable<Response> {
    return this.http.get<Response>("/api/upscaling/real-esrgan/image/status/" + taskId);
  }
}
