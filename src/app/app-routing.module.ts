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
    path: 'user-profile',
    loadChildren: () => import('./pages/home/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }