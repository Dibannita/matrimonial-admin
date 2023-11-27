import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckAuthAccessGuard} from '../auth-guard/check-auth-access.guard';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [CheckAuthAccessGuard]
      },

      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
        // canActivate: [CheckAuthAccessGuard],
      },

      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },

      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
      },

      {
        path: 'matrimonial',
        loadChildren: () => import('./matrimonial/matrimonial.module').then(m => m.MatrimonialModule),
      },

      {
        path: 'to-let',
        loadChildren: () => import('./to-let/to-let.module').then(m => m.ToLetModule),
      },

      {
        path: 'customization',
        loadChildren: () => import('./customization/customization.module').then(m => m.CustomizationModule),
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
      },
      {
        path: 'admin-control',
        loadChildren: () => import('./admin-control/admin-control.module').then(m => m.AdminControlModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'review',
        loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule),
      },

      {
        path: 'contact-request',
        loadChildren: () => import('./contact-request/contact-request.module').then(m => m.ContactRequestModule),
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule),
      },
      {
        path: 'discount-percent',
        loadChildren: () => import('./discount-percent/discount-percent.module').then(m => m.DiscountPercentModule),
      },
      {
        path: 'additionl-page',
        loadChildren: () => import('./additionl-page/additionl-page.module').then(m => m.AdditionlPageModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'reward',
        loadChildren: () => import('./reward/reward.module').then(m => m.RewardModule)
      },
      {
        path: 'seo-page',
        loadChildren: () => import('./seo-page/seo-page.module').then(m => m.SeoPageModule),
      },

      {
        path: 'add-biodata',
        loadChildren: () => import('./matrimonial/add-biodata/add-biodata.module').then(m => m.AddBiodataModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule {
}
