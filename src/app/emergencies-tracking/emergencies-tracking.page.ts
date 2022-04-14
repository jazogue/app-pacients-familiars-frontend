import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emergencies-tracking',
  templateUrl: './emergencies-tracking.page.html',
  styleUrls: ['./emergencies-tracking.page.scss'],
})
export class EmergenciesTrackingPage implements OnInit {
  patientId: string = '';
  initialPhases: any;
  newPhasesNumber: any;
  newPhasesObject: any = [];

  constructor(public api: ApiService, public activatedRoute: ActivatedRoute) {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
  }

  ngOnInit() {
    this.api.getAllPhases(this.patientId).subscribe((result) => {
      this.initialPhases = result;
    });
  }

  getNewPhases() {
    /*
    this.api.getNumberNewPhases(this.patientId).subscribe((result) => {
      this.newPhasesNumber = result;
    });

    if (this.newPhasesNumber > 0) {}
          */
    this.api.getAllPhases(this.patientId).subscribe((result) => {
      this.newPhasesObject = result;
    });

    this.addNewPhases();
  }

  private addNewPhases() {
    var found = false;
    for (let i = 0; i < this.newPhasesObject.length; i++) {
      for (let j = 0; j < this.initialPhases.length; j++) {
        if (this.newPhasesObject[i].phaseId == this.initialPhases[j].phaseId) {
          found = true;
          break;
        }
      }
      if (!found) this.initialPhases.push(this.newPhasesObject[i]);
      found = false;
    }
  }
}
