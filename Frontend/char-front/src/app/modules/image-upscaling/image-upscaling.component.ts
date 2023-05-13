import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageUpscalingService} from "../services/image-upscaling.service";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-image-upscaling',
  templateUrl: './image-upscaling.component.html',
  styleUrls: ['./image-upscaling.component.scss']
})
export class ImageUpscalingComponent implements OnInit {

  public RealEsrganHelp: Observable<string>;
  public RealEsrganHelpFailureMessage: string = "";

  constructor(private imageUpscalingService: ImageUpscalingService) {
    this.RealEsrganHelp = imageUpscalingService.getHelp()
      .pipe(catchError((error) => {
        this.RealEsrganHelpFailureMessage = "Failed to get help";
        return throwError(error);
      }));
  }

  ngOnInit(): void {
  }

}
