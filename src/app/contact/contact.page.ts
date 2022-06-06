import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  private goMenu: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.goMenu =
      this.activatedRoute.snapshot.paramMap.get('goMenu') === 'true';
  }

  goBackButton() {
    this.appComponent.removeBold();
    if (!this.goMenu) this.router.navigate(['/home']);
    else this.location.back();
  }

  goToHospitalLocation() {
    this.iab.create('https://goo.gl/maps/XC9ECLGJ4haCeWnVA');
  }

  callToTheHospital() {
    this.callNumber.callNumber('+34937417700', true);
  }
}
