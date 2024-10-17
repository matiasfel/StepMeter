import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/auth/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/auth/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/home/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
