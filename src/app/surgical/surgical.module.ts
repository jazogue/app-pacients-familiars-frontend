import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurgicalPageRoutingModule } from './surgical-routing.module';

import { SurgicalPage } from './surgical.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurgicalPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SurgicalPage],
})
export class SurgicalPageModule {}
