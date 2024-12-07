import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermsPageRoutingModule } from './perms-routing.module';

import { PermsPage } from './perms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermsPageRoutingModule
  ],
  declarations: [PermsPage]
})
export class PermsPageModule {}
