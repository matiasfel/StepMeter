import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefUsePage } from './pref-use.page';

const routes: Routes = [
  {
    path: '',
    component: PrefUsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefUsePageRoutingModule {}
