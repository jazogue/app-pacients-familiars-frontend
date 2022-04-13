import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-surgical-tracking',
  templateUrl: './surgical-tracking.page.html',
  styleUrls: ['./surgical-tracking.page.scss'],
})
export class SurgicalTrackingPage implements OnInit {
  constructor(public api: ApiService) {}

  ngOnInit() {}
}
