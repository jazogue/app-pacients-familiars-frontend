import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HospitalCareType } from '../enum-hospitalCareType';

@Component({
  selector: 'app-emergencies',
  templateUrl: './search-patient.page.html',
  styleUrls: ['./search-patient.page.scss'],
})
export class SearchPatientPage implements OnInit {
  constructor(
    public api: ApiService,
    private router: Router,
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute
  ) {
    this.hospitalCareType = this.activatedRoute.snapshot.paramMap.get(
      'hospitalCareType'
    ) as HospitalCareType;
  }

  ngOnInit() {
    this.checkBox = false;
  }

  public patientId: string;
  public hospitalCareType: HospitalCareType;
  public checkBox: boolean;
  public response: any = [];

  isChecked(event) {
    if (event.currentTarget.checked) this.checkBox = true;
    else this.checkBox = false;
  }

  checkButton() {
    if (this.checkBox && this.patientId != '' && this.patientId != null) {
      return false;
    } else {
      return true;
    }
  }

  directToEmergencyTracking() {
    var found = false;
    this.api.getPatient(this.patientId).subscribe((result) => {
      this.response = result;
      found = true;
    });
    if (
      this.response.patientId == this.patientId &&
      this.response.hospitalCareType == this.hospitalCareType
    ) {
      //arreglar necesita dos clicks para lanzarse
      this.router.navigate([
        '/tracking-room',
        { patientId: this.patientId, hospitalCareType: this.hospitalCareType },
      ]);
    } else this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Este paciente no existe o se introdujo de forma incorrecta',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
