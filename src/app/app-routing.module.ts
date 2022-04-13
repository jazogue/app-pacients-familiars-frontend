import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'emergencies',
    loadChildren: () => import('./emergencies/emergencies.module').then( m => m.EmergenciesPageModule)
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then( m => m.LegalPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'surgical',
    loadChildren: () => import('./surgical/surgical.module').then( m => m.SurgicalPageModule)
  },
  {
    path: 'emergencies-tracking',
    loadChildren: () => import('./emergencies-tracking/emergencies-tracking.module').then( m => m.EmergenciesTrackingPageModule)
  },
  {
    path: 'surgical-tracking',
    loadChildren: () => import('./surgical-tracking/surgical-tracking.module').then( m => m.SurgicalTrackingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
