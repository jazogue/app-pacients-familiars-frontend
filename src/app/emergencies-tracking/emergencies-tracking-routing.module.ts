import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergenciesTrackingPage } from './emergencies-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: EmergenciesTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergenciesTrackingPageRoutingModule {}
