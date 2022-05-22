import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HospitalCareType } from '../enum-hospitalCareType';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-emergencies',
  templateUrl: './search-patient.page.html',
  styleUrls: ['./search-patient.page.scss'],
})
export class SearchPatientPage implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.hospitalCareType = this.activatedRoute.snapshot.paramMap.get(
      'hospitalCareType'
    ) as HospitalCareType;
  }

  ngOnInit() {
    this.checkBox = false;

    if (this.hospitalCareType == HospitalCareType.quirurgic) {
      this.hospitalCareTypeText = 'ROOM_SURG';
    } else {
      this.hospitalCareTypeText = 'ROOM_EMER';
    }
  }

  private patientId: string = '';
  private hospitalCareType: HospitalCareType;
  private hospitalCareTypeText: string;
  private checkBox: boolean;
  private response: any;

  isChecked(event) {
    if (event.currentTarget.checked) this.checkBox = true;
    else this.checkBox = false;
  }

  directToEmergencyTracking() {
    if (this.patientId == '' || this.patientId == null) {
      this.presentToastSearchIdError();
    } else if (!this.checkBox) {
      this.presentToastSearchLegalError();
    } else if (this.patientId !== null && this.patientId !== '') {
      this.api.getPatient(this.patientId).subscribe(
        (result) => {
          this.response = result;
          this.router.navigate([
            'search-patient/tracking-room',
            {
              patientId: this.patientId,
            },
          ]);
        },
        (err) => {
          this.presentToastErrorSearch();
        }
      );
    }
  }

  directToLegal() {
    this.router.navigate(['/legal', { goMenu: 'true' }]);
  }

  private async presentToastErrorSearch() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('NOT_FOUND_ERROR'),
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastSearchLegalError() {
    var toast = await this.toastController.create({
      message: this.translateService.instant('ERROR_SEARCH_LEGAL'),
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastSearchIdError() {
    var toast = await this.toastController.create({
      message: this.translateService.instant('ERROR_SEARCH_ID'),
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }
}
