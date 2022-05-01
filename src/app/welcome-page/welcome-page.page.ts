import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {
  constructor(
    private router: Router,
    public translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('Català');
    this.translateService.addLangs(['Català', 'Español', 'English']);
    this.langs = this.translateService.getLangs();
  }

  langs: string[] = [];

  ngOnInit() {
    const checkView = localStorage.getItem('pageDisplayed');

    if (checkView) {
      this.router.navigate(['/home']);
    }
    localStorage.setItem('pageDisplayed', 'Y');
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
  }

  directToHome() {
    this.router.navigate(['/home']);
  }
}
