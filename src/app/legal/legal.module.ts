import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalPageRoutingModule } from './legal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LegalPage } from './legal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalPageRoutingModule,
    TranslateModule,
  ],
  declarations: [LegalPage],
})
export class LegalPageModule {}
