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

  constructor(
    private router: Router,
    private menu: MenuController,
    private translateService: TranslateService
  ) {
    this.langs = this.translateService.getLangs();
  }
  goToLegalConditions() {
    this.router.navigate(['/legal']);
    this.closeTheMenu();
  }
  goToContactDetails() {
    this.router.navigate(['/contact']);
    this.closeTheMenu();
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    this.closeTheMenu();
  }

  private closeTheMenu() {
    if (this.menu.isOpen()) {
      this.menu.close('first');
    }
  }
}
