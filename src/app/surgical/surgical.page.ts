import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surgical',
  templateUrl: './surgical.page.html',
  styleUrls: ['./surgical.page.scss'],
})
export class SurgicalPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  directToSurgicalTracking() {
    this.router.navigate(['/emergencies-tracking']);
  }
}
