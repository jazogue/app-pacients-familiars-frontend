import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergenciesTrackingPageRoutingModule } from './emergencies-tracking-routing.module';

import { EmergenciesTrackingPage } from './emergencies-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergenciesTrackingPageRoutingModule
  ],
  declarations: [EmergenciesTrackingPage]
})
export class EmergenciesTrackingPageModule {}
