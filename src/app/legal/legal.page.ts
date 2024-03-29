import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  goMenu: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
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
}
