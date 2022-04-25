import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingRoomPage } from './tracking-room.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingRoomPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingRoomPageRoutingModule {}
