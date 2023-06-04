import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageUpscalingService} from "../../services/image-upscaling.service";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RealEsrganImageRequest} from "../../models/real-esrgan-image-request";
import {InboxService} from "../../services/inbox.service";
import {ArrayType} from "@angular/compiler";

@Component({
  selector: 'app-image-upscaling',
  templateUrl: './image-upscaling.component.html',
  styleUrls: ['./image-upscaling.component.scss']
})
export class ImageUpscalingComponent implements OnInit {

  public RealEsrganHelp: Observable<string>;
  public RealEsrganHelpFailureMessage: string = "";
  public RealEsrganImageFailureMessage: string = "";


  public useDefaultScaleRatio = new FormControl(true);
  public scaleRatio = new FormControl({value: '', disabled: true}, [Validators.required]);

  public useDefaultModelName = new FormControl(true);
  public modelName = new FormControl({value: '', disabled: true}, [Validators.required]);

  public useDefaultOutputFormat = new FormControl(true);
  public outputFormat = new FormControl({value: '', disabled: true}, [Validators.required]);

  public useDefaultVerboseOutput = new FormControl(true);
  public verboseOutput = new FormControl({value: '', disabled: true}, [Validators.required]);

  public upscaleForm: FormGroup = new FormGroup({
    useDefaultScaleRatio: this.useDefaultScaleRatio,
    scaleRatio: this.scaleRatio,
    modelName: this.modelName,
    outputFormat: this.outputFormat,
    verboseOutput: this.verboseOutput
  });



  selectedFiles: any = null;
  selectedFilesNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  selectedFilesName: Observable<string>;

  updateSelectedNameSubject() {
    let files = this.getSelectedFilesList();
    console.log(files);

    this.selectedFilesNameSubject.next(files.map(file => file.name).join(" "));
  }

  getSelectedFilesList() : File[] {
    if (this.selectedFiles instanceof File) {
      return [this.selectedFiles];
    } else if (this.selectedFiles instanceof FileList) {
      return Array.from(this.selectedFiles);
    }

    return [];
  }

  constructor(private imageUpscalingService: ImageUpscalingService, private inboxService: InboxService) {
    this.selectedFilesName = this.selectedFilesNameSubject.asObservable();

    this.RealEsrganHelp = imageUpscalingService.getHelp()
      .pipe(catchError((error) => {
        this.RealEsrganHelpFailureMessage = "Failed to get help";
        return throwError(error);
      }));
  }

  ngOnInit(): void {
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = event.target.files ?? null;
    this.updateSelectedNameSubject();
  }

  onDefaultScaleRatioChanged() {
    if (this.useDefaultScaleRatio.value) {
      this.scaleRatio.disable();
    } else {
      this.scaleRatio.enable();
    }
  }

  onDefaultModelNameChanged() {
    if (this.useDefaultModelName.value) {
      this.modelName.disable();
    } else {
      this.modelName.enable();
    }
  }

  onDefaultOutputFormatChanged() {
    if (this.useDefaultOutputFormat.value) {
      this.outputFormat.disable();
    } else {
      this.outputFormat.enable();
    }
  }

  onDefaultVerboseOutputChanged() {
    if (this.useDefaultVerboseOutput.value) {
      this.verboseOutput.disable();
    } else {
      this.verboseOutput.enable();
    }
  }

  onSubmit() {
    if (this.upscaleForm.invalid) return;
    let files = this.getSelectedFilesList();
    if (files.length === 0) return;

    let upscaleObject: RealEsrganImageRequest = {};
    if (!this.useDefaultScaleRatio.value) {
      upscaleObject.scaleRatio = parseInt(this.scaleRatio.value!);
    }
    if (!this.useDefaultOutputFormat.value) {
      upscaleObject.outputFormat = this.outputFormat.value!;
    }
    if (!this.useDefaultModelName.value) {
      upscaleObject.modelName = this.modelName.value!;
    }
    if (!this.useDefaultVerboseOutput.value) {
      upscaleObject.verboseOutput = (this.verboseOutput.value! === 'true');
    }

    files.forEach(file => {
      let imageUpscalingSubscription = this.imageUpscalingService
        .upscaleImage(upscaleObject, file)
        .pipe(
          catchError((error) => {
            this.RealEsrganImageFailureMessage = "Failed to send request due to error: " + JSON.stringify(error);
            return throwError(error);
          })
        );

      this.inboxService.imageUpscaleSubscription(imageUpscalingSubscription, file.name);
    });
  }

}
