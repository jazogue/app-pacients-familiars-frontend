import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurgicalTrackingPageRoutingModule } from './surgical-tracking-routing.module';

import { SurgicalTrackingPage } from './surgical-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurgicalTrackingPageRoutingModule
  ],
  declarations: [SurgicalTrackingPage]
})
export class SurgicalTrackingPageModule {}
