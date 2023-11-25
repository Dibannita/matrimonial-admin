import { AdminAuthGuard } from './auth-guard/admin-auth.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { AdminAuthStateGuard } from './auth-guard/admin-auth-state.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

   // ADMIN
   {
    path: environment.adminLoginUrl,
    canActivate: [AdminAuthStateGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  // USER
  // {
  //   path: environment.userLoginUrl,
  //   // canActivate: [UserAuthStateGuard],
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled'
  })],
  providers: [AdminAuthGuard, AdminAuthStateGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
