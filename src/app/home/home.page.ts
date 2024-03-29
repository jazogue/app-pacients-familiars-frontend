import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalCareType } from '../enum-hospitalCareType';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

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
