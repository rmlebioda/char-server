import { Component } from '@angular/core';
import {ColorSchemeService} from "./modules/services/color-scheme.service";
import {Consts} from "./consts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'char-front';
  checked: boolean;

  constructor(private colorSchemeService: ColorSchemeService) {
    colorSchemeService.setDefaultColorScheme();
    this.checked = colorSchemeService.isDarkTheme();
  }

  colorThemeChanged(checked: boolean) {
    if (checked) {
      this.colorSchemeService.setColorScheme(Consts.ColorDark);
    } else {
      this.colorSchemeService.setColorScheme(Consts.ColorLight);
    }
  }
}
