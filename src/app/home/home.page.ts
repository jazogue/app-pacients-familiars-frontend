import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalCareType } from '../enum-hospitalCareType';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('Català');
    this.translateService.addLangs(['Català', 'Español', 'English']);
  }

  directToEmergency() {
    this.router.navigate([
      '/search-patient',
      { hospitalCareType: HospitalCareType.urgencies },
    ]);
  }

  directToSurgical() {
    this.router.navigate([
      '/search-patient',
      { hospitalCareType: HospitalCareType.quirurgic },
    ]);
  }
}
