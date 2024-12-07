import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { homeGuard } from './guards/home.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/auth/landing/landing.module').then( m => m.LandingPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/auth/registration/registration.module').then( m => m.RegistrationPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/auth/recovery/recovery.module').then( m => m.RecoveryPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/home/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/home/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/home/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/home/settings/options/account/account.module').then( m => m.AccountPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/home/settings/options/notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'pref-use',
    loadChildren: () => import('./pages/home/settings/options/pref-use/pref-use.module').then( m => m.PrefUsePageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'perms',
    loadChildren: () => import('./pages/home/settings/options/perms/perms.module').then( m => m.PermsPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/home/settings/options/security/security.module').then( m => m.SecurityPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'data',
    loadChildren: () => import('./pages/home/settings/options/data/data.module').then( m => m.DataPageModule),
    canActivate: [homeGuard]
  },
  {
    path: 'general-info',
    loadChildren: () => import('./pages/home/settings/options/general-info/general-info.module').then( m => m.GeneralInfoPageModule),
    canActivate: [homeGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }