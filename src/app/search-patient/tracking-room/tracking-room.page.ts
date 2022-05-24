import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({
  selector: 'app-emergencies-tracking',
  templateUrl: './tracking-room.page.html',
  styleUrls: ['./tracking-room.page.scss'],
})
export class TrackingRoomPage implements OnInit, OnDestroy {
  private patientId: string = '';
  private admissionId: string = '';
  private ableNotifications = false;
  private initialStates: any = [];
  private newStatesObject: any = [];
  private subscription: Subscription;
  private idiom: string;
  private newStatesNumber: number;
  private stateAvailable = false;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private translateService: TranslateService,
    private localNotifications: LocalNotifications,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.idiom = this.translateService.instant('LANGUAGE');

    if (this.platform.is('cordova')) {
      this.initializeLocalNotifications();
      this.ableNotifications = true;
    }

    this.api.getAdmissionByPatientId(this.patientId).subscribe(
      (result: any) => {
        this.admissionId = result.admissionId;

        this.api.getAllStates(this.admissionId, this.idiom).subscribe(
          (result) => {
            this.initialStates = result;
            if (this.initialStates.length > 0) {
              this.stateAvailable = true;
            }
          },
          (err) => {
            this.dischargedPatientToast();
            window.history.back();
          }
        );
      },
      (err) => {
        this.dischargedPatientToast();
        window.history.back();
      }
    );

    const source = interval(2000);
    this.subscription = source.subscribe((val) => this.updateStates());
  }

  updateStates() {
    this.api.getAllStates(this.admissionId, this.idiom).subscribe((result) => {
      this.newStatesObject = result;
    });

    this.newStatesNumber =
      this.newStatesObject.length - this.initialStates.length;

    if (this.newStatesNumber > 0) {
      this.addNewStates();
      if (this.ableNotifications) {
        this.sendNotification();
      }
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

    if (this.initialStates.length > 0) {
      this.stateAvailable = true;
    }
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
        if (this.newStatesObject[i].eventId == this.initialStates[j].eventId) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async initializeLocalNotifications() {
    await this.localNotifications.requestPermission();
    this.localNotifications.on('click').subscribe((notification) => {
      this.router.navigate([
        'search-patient/tracking-room',
        {
          patientId: this.patientId,
        },
      ]);
    });
  }

  private async sendNotification() {
    await this.localNotifications.schedule({
      id: 1,
      title: this.translateService.instant('NOTIFICATION_TITLE'),
      text: this.translateService.instant('NEW_STATE'),
      led: true,
      vibrate: true,
    });
  }

  private async foundNewStatesToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('NEW_STATE'),
      duration: 1000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }

  private async dischargedPatientToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('DISCHARGED_PATIENT'),
      duration: 1000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }
}
