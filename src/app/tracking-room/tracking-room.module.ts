import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingRoomPageRoutingModule } from './tracking-room-routing.module';

import { TrackingRoomPage } from './tracking-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingRoomPageRoutingModule,
  ],
  declarations: [TrackingRoomPage],
})
export class EmergenciesTrackingPageModule {}
