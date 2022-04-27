import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { HospitalCareType } from '../enum-hospitalCareType';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
//import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-emergencies-tracking',
  templateUrl: './tracking-room.page.html',
  styleUrls: ['./tracking-room.page.scss'],
})
export class TrackingRoomPage implements OnInit {
  patientId: string = '';
  hospitalCareType: string;
  initialStates: any = [];
  newStatesObject: any = [];
  newStatesNumber: any;
  subscription: Subscription;
  reloadingCount: number;

  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    //public toastController: ToastController,
    public translateService: TranslateService
  ) {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.hospitalCareType = this.activatedRoute.snapshot.paramMap.get(
      'hospitalCareType'
    ) as HospitalCareType;
  }

  ngOnInit() {
    this.api.getAllStates(this.patientId).subscribe((result) => {
      this.initialStates = this.translateAllStates(result);
    });

    const source = interval(2000);
    this.subscription = source.subscribe((val) => this.getNewStates());
  }

  getNewStates() {
    this.api.getAllStates(this.patientId).subscribe((result) => {
      this.newStatesObject = result;
    });
    this.newStatesNumber =
      this.newStatesObject.length - this.initialStates.length;

    if (this.newStatesNumber > 0) {
      this.addNewStates();
      return true;
    } else return false;
  }
  /*
  getForcedNewStates() {
    if (this.getNewStates() == false) {
      this.reloadingCount++;
    } else {
      this.reloadingCount = 0;
      this.notFoundNewStatesToast();
    }
    if (this.reloadingCount == 10) {
      this.reloadingCount = 0;
    }
  }
  */

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        this.initialStates.push(this.translateState(this.newStatesObject[i]));
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

  private translateAllStates(states) {
    var translatedStates: any = states;

    this.presentLoadingWithOptions();
    this.api.getAllTranslations(states, 'ca').subscribe((result: any) => {
      for (let i = 0; i < states.length; i++) {
        translatedStates[i].stateName =
          result.data.translations[i].translatedText;
      }
      this.loadingController.dismiss();
    });
    return translatedStates;
  }

  private translateState(text) {
    this.api.getTranslation(text.stateName, 'ca').subscribe((result: any) => {
      text.stateName = result.data.translations[0].translatedText;
    });
    return text;
  }

  private async presentLoadingWithOptions() {
    var loading = await this.loadingController.create({
      message: this.translateService.instant('LOADING_STATES'),
      spinner: 'bubbles',
    });
    return await loading.present();
  }

  /*
  async notFoundNewStatesToast() {
    const toast = await this.toastController.create({
      message: 'No hay nuevos estados',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  */
}
