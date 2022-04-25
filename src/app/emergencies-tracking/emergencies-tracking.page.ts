import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { HospitalCareType } from '../enum-hospitalCareType';

@Component({
  selector: 'app-emergencies-tracking',
  templateUrl: './emergencies-tracking.page.html',
  styleUrls: ['./emergencies-tracking.page.scss'],
})
export class EmergenciesTrackingPage implements OnInit {
  patientId: string = '';
  initialStates: any;
  newStatesNumber: any;
  newStatesObject: any = [];
  subscription: Subscription;
  hospitalCareType: string;

  constructor(public api: ApiService, public activatedRoute: ActivatedRoute) {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.hospitalCareType = this.activatedRoute.snapshot.paramMap.get(
      'hospitalCareType'
    ) as HospitalCareType;
  }

  ngOnInit() {
    this.api.getAllStates(this.patientId).subscribe((result) => {
      this.initialStates = result;
    });

    const source = interval(2000);
    this.subscription = source.subscribe((val) => this.getNewStates());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getNewStates() {
    this.api.getAllStates(this.patientId).subscribe((result) => {
      this.newStatesObject = result;
    });
    this.newStatesNumber =
      this.newStatesObject.length - this.initialStates.length;

    if (this.newStatesNumber > 0) this.addNewStates();
  }

  private addNewStates() {
    var found = false;
    for (
      let i = 0;
      i < this.newStatesObject.length && this.newStatesNumber > 0;
      i++
    ) {
      for (
        let j = 0;
        j < this.initialStates.length && this.newStatesNumber > 0;
        j++
      ) {
        if (this.newStatesObject[i].stateId == this.initialStates[j].stateId) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.initialStates.push(this.newStatesObject[i]);
        this.newStatesNumber--;
      }
      found = false;
    }
    this.initialStates.sort((a, b) => {
      if (a.startTime < b.startTime) return -1;
      else if (a.startTime > b.startTime) return 1;
      else return 0;
    });
  }
}
