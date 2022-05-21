import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingRoomPageRoutingModule } from './tracking-room-routing.module';

import { TrackingRoomPage } from './tracking-room.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingRoomPageRoutingModule,
    TranslateModule,
  ],
  declarations: [TrackingRoomPage],
})
export class TrackingRoomPageModule {}
