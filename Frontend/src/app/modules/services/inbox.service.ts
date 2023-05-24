import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, interval, map, Observable, Subscription} from "rxjs";
import {Consts} from "../../consts";
import {Mail, MailType} from "../models/mail";
import {RealEsrganImageResponse, RealEsrganImageResponseStatus} from "../models/real-esrgan-image-response";
import {ImageUpscalingService} from "./image-upscaling.service";

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  private refreshInboxInterval = interval(5000);
  private refreshInboxSubscription?: Subscription;

  private mailsSubject = new BehaviorSubject<Mail[]>([]);
  private mailObserver: Observable<Mail[]>;

  constructor(private imageUpscalingService: ImageUpscalingService) {
    this.loadInbox();
    this.mailObserver = this.mailsSubject.asObservable();
    this.mailObserver
      .subscribe({next: this.onMailsChange})
    this.runBackgroundScheduler();
  }

  private loadInbox() {
    const mails = localStorage.getItem(Consts.InboxMails);
    if (mails) {
      this.mailsSubject.next(JSON.parse(mails));
    }
  }

  private onMailsChange(mails: Mail[]) {
    console.log(mails);
    localStorage.setItem(Consts.InboxMails, JSON.stringify(mails));
  }

  private runBackgroundScheduler() {
    this.refreshInboxSubscription = this.refreshInboxInterval.subscribe(val => {

      this.mailsSubject.value
        .filter(mail => mail.Type === MailType.ImageUpscaling
          && (mail.Data as RealEsrganImageResponse).status === RealEsrganImageResponseStatus.Started)
        .forEach((mail) => {
          this.checkMail(mail);
        });

      this.mailsSubject.value
        .filter(mail => mail.Type === MailType.ImageUpscaling && (mail.Data as RealEsrganImageResponse).status === RealEsrganImageResponseStatus.Finished && this.didExpire(mail))
        .forEach((mail) => {
          this.invalidateMail(mail);
        });

    });
  }

  private didExpire(mail: Mail): boolean {
    if (typeof (mail.Data as RealEsrganImageResponse).expiryDate === 'string') {
      (mail.Data as RealEsrganImageResponse).expiryDate = new Date((mail.Data as RealEsrganImageResponse).expiryDate!);
    }
    return new Date() > ((mail.Data as RealEsrganImageResponse).expiryDate ?? new Date(-8640000000000000));
  }

  private checkMail(mail: Mail) {
    this.imageUpscalingService
      .getUpscsaledImageStatus(mail.Identifier)
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error.status === 404) {
            (mail.Data as RealEsrganImageResponse).status = RealEsrganImageResponseStatus.Expired;
            mail.Status = this.getImageUpscalingResponseStatusDescription(RealEsrganImageResponseStatus.Expired);
            this.updateMail(mail);
          }
          throw error;
        })
      )
      .subscribe(
        (response) => {
          (mail.Data as RealEsrganImageResponse).status = RealEsrganImageResponseStatus.Finished;
          mail.Status = this.getImageUpscalingResponseStatusDescription(RealEsrganImageResponseStatus.Finished);
          mail.UrlReference = "/api/upscaling/real-esrgan/image/" + mail.Identifier;
          this.updateMail(mail);
          return response;
        }
      );
  }

  private invalidateMail(mail: Mail) {
    console.log("invalidating mail");
    (mail.Data as RealEsrganImageResponse).status = RealEsrganImageResponseStatus.Expired;
    mail.Status = this.getImageUpscalingResponseStatusDescription(RealEsrganImageResponseStatus.Expired);
    mail.UrlReference = "";
    this.updateMail(mail);
  }

  addMail(mail: Mail) {
    this.mailsSubject.next([...this.mailsSubject.value, mail]);
  }

  getMails(): Observable<Mail[]> {
    return this.mailsSubject.asObservable();
  }

  deleteMail(mail: Mail) {
    this.mailsSubject.next(this.mailsSubject.value.filter(m => m.Identifier != mail.Identifier));
  }

  updateMail(mail: Mail) {
    let filteredMails = this.mailsSubject.value.filter(_mail => _mail.Identifier !== mail.Identifier);
    this.mailsSubject.next([mail, ...filteredMails]);
  }

  getBadgeCount(): Observable<number> {
    return this.mailsSubject
      .asObservable()
      .pipe(map((mails) => mails.length));
  }

  imageUpscaleSubscription(imageUpscalingSubscription: Observable<RealEsrganImageResponse>, originalFileName: string) {
    imageUpscalingSubscription.subscribe(
      (res) => {
        this.saveUpscalingImageResponse(res, originalFileName)
      }
    );
  }

  saveUpscalingImageResponse(response: RealEsrganImageResponse, originalFileName: string) {
    if (response.status != RealEsrganImageResponseStatus.Started) {
      console.log(response);
    }
    let newMail: Mail = {} as Mail;
    newMail.Identifier = response.imageIdentifier ?? '';
    newMail.Name = originalFileName;
    newMail.Data = response;
    newMail.Status = this.getImageUpscalingResponseStatusDescription(response.status);
    newMail.Type = MailType.ImageUpscaling;
    this.addMail(newMail);
  }

  private getImageUpscalingResponseStatusDescription(value: RealEsrganImageResponseStatus): string {
    if (value === RealEsrganImageResponseStatus.Started) {
      return 'Started';
    }
    if (value === RealEsrganImageResponseStatus.Failed) {
      return 'Failed';
    }
    if (value === RealEsrganImageResponseStatus.Exception) {
      return 'Failure';
    }
    if (value === RealEsrganImageResponseStatus.Finished) {
      return 'Finished';
    }
    if (value === RealEsrganImageResponseStatus.Expired) {
      return 'Expired';
    }
    return 'Unknown';
  }
}
