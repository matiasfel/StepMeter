import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'account',
    loadChildren: () => import('./options/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./options/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'pref-use',
    loadChildren: () => import('./options/pref-use/pref-use.module').then( m => m.PrefUsePageModule)
  },
  {
    path: 'perms',
    loadChildren: () => import('./options/perms/perms.module').then( m => m.PermsPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./options/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'data',
    loadChildren: () => import('./options/data/data.module').then( m => m.DataPageModule)
  },
  {
    path: 'general-info',
    loadChildren: () => import('./options/general-info/general-info.module').then( m => m.GeneralInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
