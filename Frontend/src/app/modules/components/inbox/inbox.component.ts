import {Component, ViewEncapsulation} from '@angular/core';
import {InboxService} from "../../services/inbox.service";
import {Observable} from "rxjs";
import {Mail} from "../../models/mail";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {

  public mails: Observable<Mail[]>;
  public displayedColumns = ['download', 'name', 'delete'];

  constructor(
    private inboxService: InboxService
  ) {
    this.mails = inboxService.getMails();
  }

  deleteMail(mail: Mail) {
    this.inboxService.deleteMail(mail);
  }

  downloadMail(mail: Mail) {
    window.open(mail.UrlReference, "_blank");
  }
}
