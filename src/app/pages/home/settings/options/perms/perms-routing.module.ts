import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermsPage } from './perms.page';

const routes: Routes = [
  {
    path: '',
    component: PermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermsPageRoutingModule {}
