import {Component, ViewEncapsulation} from '@angular/core';
import {ColorSchemeService} from "./modules/services/color-scheme.service";
import {Consts} from "./consts";
import {Observable} from "rxjs";
import {InboxService} from "./modules/services/inbox.service";
import {SpinnerService} from "./modules/services/spinner.service";

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
    private inboxService: InboxService,
    public spinnerService: SpinnerService
  ) {
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
