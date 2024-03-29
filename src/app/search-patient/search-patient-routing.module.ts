import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPatientPage } from './search-patient.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPatientPage,
  },
  {
    path: 'tracking-room',
    loadChildren: () =>
      import('./tracking-room/tracking-room.module').then(
        (m) => m.TrackingRoomPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPatientPageRoutingModule {}
