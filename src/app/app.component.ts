import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  langs: string[] = [];
  selectedItem: string;

  constructor(
    private router: Router,
    private menu: MenuController,
    private translateService: TranslateService
  ) {
    if (localStorage.getItem('selectedLang') == null) {
      this.translateService.setDefaultLang('Català');
    } else {
      this.translateService.setDefaultLang(
        localStorage.getItem('selectedLang')
      );
    }
    this.translateService.addLangs(['Català', 'Español', 'English']);
    this.langs = this.translateService.getLangs();
  }

  goToLegalConditionsOrContact(selected: string) {
    var url: string = this.getUrl();
    this.selectedItem = selected;
    if (url != '/legal' && url != '/contact') {
      this.router.navigate(['/' + selected, { goMenu: 'true' }]);
    } else {
      this.router.navigate(['/' + selected, { goMenu: 'false' }]);
    }
    this.closeTheMenu();
  }

  removeBold() {
    this.selectedItem = '';
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    localStorage.setItem('selectedLang', event.detail.value);
    this.closeTheMenu();
  }

  getLanguage() {
    return this.translateService.instant('LONG_LANGUAGE').toString();
  }

  private getUrl() {
    if (this.router.url.indexOf(';') != -1) {
      return this.router.url.substring(0, this.router.url.indexOf(';'));
    }
    return this.router.url;
  }

  private closeTheMenu() {
    if (this.menu.isOpen()) {
      this.menu.close('first');
    }
  }
}
