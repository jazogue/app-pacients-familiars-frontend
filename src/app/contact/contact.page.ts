import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  goMenu: boolean;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.goMenu =
      this.activatedRoute.snapshot.paramMap.get('goMenu') === 'true';
  }

  goBackButton() {
    if (!this.goMenu) this.router.navigate(['/home']);
    else this.location.back();
  }
}
