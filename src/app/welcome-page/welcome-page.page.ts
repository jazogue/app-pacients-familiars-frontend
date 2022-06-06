import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IonSelect } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {
  private showingSlide = false;
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  langs: string[] = [];
  @ViewChild('langSelector') select: IonSelect;
  @ViewChild(IonSlides) slides: IonSlides;

  ngOnInit() {
    this.langs = this.translateService.getLangs();
    const checkView = localStorage.getItem('pageDisplayed');
    /*
    if (checkView) {
      this.router.navigate(['/home']);
    }
    localStorage.setItem('pageDisplayed', 'Y');
    */
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    localStorage.setItem('selectedLang', event.detail.value);
  }

  getLanguage() {
    return this.translateService.instant('LONG_LANGUAGE').toString();
  }

  directToHome() {
    this.router.navigate(['/home']);
  }

  sliderChanges() {
    this.showingSlide = !this.showingSlide;
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
}
