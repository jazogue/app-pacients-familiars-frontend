import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalCareType } from '../enum-hospitalCareType';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  directToEmergency() {
    this.router.navigate([
      '/emergencies',
      { hospitalCareType: HospitalCareType.urgencies },
    ]);
  }

  directToSurgical() {
    this.router.navigate([
      '/emergencies',
      { hospitalCareType: HospitalCareType.quirurgic },
    ]);
  }
}
