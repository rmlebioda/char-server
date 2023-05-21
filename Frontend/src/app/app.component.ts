import { Component } from '@angular/core';
import {ColorSchemeService} from "./modules/services/color-scheme.service";
import {Consts} from "./consts";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {InboxService} from "./modules/services/inbox.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'FrontEnd';
  checked: boolean;
  matBadgeCount: Observable<number>;


  constructor(
    private colorSchemeService: ColorSchemeService,
    private inboxService: InboxService) {
    colorSchemeService.setDefaultColorScheme();
    this.checked = colorSchemeService.isDarkTheme();
    this.matBadgeCount = inboxService.getBadgeCount();
  }

  colorThemeChanged(checked: boolean) {
    if (checked) {
      this.colorSchemeService.setColorScheme(Consts.ColorDark);
    } else {
      this.colorSchemeService.setColorScheme(Consts.ColorLight);
    }
  }
}
