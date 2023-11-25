import { AddOfferComponent } from './multi-promo-offer/add-offer/add-offer.component';
import { AllOfferComponent } from './multi-promo-offer/all-offer/all-offer.component';
import { AddPromoOfferComponent } from './promo-offer/add-promo-offer/add-promo-offer.component';
import { AllPromoOfferComponent } from './promo-offer/all-promo-offer/all-promo-offer.component';
import { AddCouponComponent } from './coupon/add-coupon/add-coupon.component';
import { AllCouponComponent } from './coupon/all-coupon/all-coupon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpecialPackageComponent } from './special-package/add-special-package/add-special-package.component';
import { AllSpecialPackageComponent } from './special-package/all-special-package/all-special-package.component';

const routes: Routes = [
  
    { path: 'all-coupon', component: AllCouponComponent },
  { path: 'add-coupon', component: AddCouponComponent },
  { path: 'edit-coupon/:id', component: AddCouponComponent }, 

  {path: 'special-package', component: AllSpecialPackageComponent},
  {path: 'add-special-package', component: AddSpecialPackageComponent},
  {path: 'view-special-package/:id', component: AddSpecialPackageComponent},
  {path: 'edit-special-package/:id', component: AddSpecialPackageComponent},
  
  { path: 'all-promo-offer', component: AllPromoOfferComponent },
  { path: 'add-promo-offer', component: AddPromoOfferComponent },
  { path: 'view-promo-offer/:id', component: AddPromoOfferComponent }, 
  { path: 'edit-promo-offer/:id', component: AddPromoOfferComponent }, 

  { path: 'all-multi-promo-offer', component: AllOfferComponent },
  { path: 'add-multi-promo-offer', component: AddOfferComponent },
  { path: 'view-multi-promo-offer/:id', component: AddOfferComponent }, 
  { path: 'edit-multi-promo-offer/:id', component: AddOfferComponent }, 
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
