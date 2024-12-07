import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrefUsePageRoutingModule } from './pref-use-routing.module';

import { PrefUsePage } from './pref-use.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrefUsePageRoutingModule
  ],
  declarations: [PrefUsePage]
})
export class PrefUsePageModule {}
