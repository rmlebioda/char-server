import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Consts} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setDefaultColorScheme() {
    const localStorageColorScheme = localStorage.getItem(Consts.PreferStorageKey);
    if (localStorageColorScheme) {
      this.setColorScheme(localStorageColorScheme);
    } else {
    this.setColorScheme(Consts.ColorLight);
    }
  }

  private hasClass(el: any, className: string) {
    return el.getAttribute('class') && el.getAttribute('class').split(' ').indexOf(className) !== -1;
  }

  setColorScheme(scheme: string) {
    if (scheme === Consts.ColorDark) {
      if (!this.hasClass(document.body, Consts.DarkModeSchemeBodyClassName)) {
        this.renderer.addClass(document.body, Consts.DarkModeSchemeBodyClassName);
      }
    } else {
      if (this.hasClass(document.body, Consts.DarkModeSchemeBodyClassName)) {
        this.renderer.removeClass(document.body, Consts.DarkModeSchemeBodyClassName);
      }
    }
    localStorage.setItem(Consts.PreferStorageKey, scheme);
  }

  isDarkTheme(): boolean {
    return localStorage.getItem(Consts.PreferStorageKey) === Consts.ColorDark;
  }
}
