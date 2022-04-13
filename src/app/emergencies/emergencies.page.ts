import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.page.html',
  styleUrls: ['./emergencies.page.scss'],
})
export class EmergenciesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkBox = false;
  }
  public patientId: string;
  public checkBox: boolean;

  isChecked(event) {
    if (event.currentTarget.checked) this.checkBox = true;
    else this.checkBox = false;
  }
  checkButton() {
    if (this.checkBox && (this.patientId != '' || this.patientId != null)) {
      return false;
    } else {
      return true;
    }
  }

  directToEmergencyTracking() {
    this.router.navigate(['/emergencies-tracking']);
  }
}
