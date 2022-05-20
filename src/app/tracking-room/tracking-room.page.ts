import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { HospitalCareType } from '../enum-hospitalCareType';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-emergencies-tracking',
  templateUrl: './tracking-room.page.html',
  styleUrls: ['./tracking-room.page.scss'],
})
export class TrackingRoomPage implements OnInit, OnDestroy {
  patientId: string = '';
  admissionId: string = '';
  hospitalCareType: string;
  initialStates: any = [];
  newStatesObject: any = [];
  subscription: Subscription;
  idiom: string;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public translateService: TranslateService
  ) {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.hospitalCareType = this.activatedRoute.snapshot.paramMap.get(
      'hospitalCareType'
    ) as HospitalCareType;
  }

  ngOnInit() {
    this.idiom = this.translateService.instant('LANGUAGE');

    this.api
      .getAdmissionByPatientId(this.patientId)
      .subscribe((result: any) => {
        this.admissionId = result.admissionId;

        this.api
          .getAllStates(this.admissionId, this.idiom)
          .subscribe((result) => {
            this.initialStates = result;
          });
      });

    const source = interval(2000);
    this.subscription = source.subscribe((val) => this.updateStates());
  }

  updateStates() {
    this.api.getAllStates(this.admissionId, this.idiom).subscribe((result) => {
      this.newStatesObject = result;
    });

    var newStatesNumber =
      this.newStatesObject.length - this.initialStates.length;

    if (newStatesNumber > 0) {
      var newStates = this.newStatesObject.slice(
        this.newStatesObject.length - newStatesNumber - 1,
        this.newStatesObject.length - 1
      );
      for (let i = 0; i < newStatesNumber; i++) {
        this.initialStates.push(newStates[i]);
      }
      this.initialStates.push();
      this.foundNewStatesToast();
    }

    if (this.idiom !== this.translateService.instant('LANGUAGE')) {
      this.idiom = this.translateService.instant('LANGUAGE');
      this.api
        .getAllStates(this.admissionId, this.idiom)
        .subscribe((result) => {
          this.initialStates = result;
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async presentLoadingWithOptions() {
    var loading = await this.loadingController.create({
      message: this.translateService.instant('LOADING_STATES'),
      spinner: 'bubbles',
    });
    return await loading.present();
  }

  private async foundNewStatesToast() {
    const toast = await this.toastController.create({
      message: 'Nuevo estado',
      duration: 1000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }
}
