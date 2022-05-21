import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome-page',
    loadChildren: () =>
      import('./welcome-page/welcome-page.module').then(
        (m) => m.WelcomePagePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full',
  },
  {
    path: 'search-patient',
    loadChildren: () =>
      import('./search-patient/search-patient.module').then(
        (m) => m.SearchPatientPageModule
      ),
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./legal/legal.module').then((m) => m.LegalPageModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
