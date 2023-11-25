import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { AddCouponComponent } from './coupon/add-coupon/add-coupon.component';
import { AllCouponComponent } from './coupon/all-coupon/all-coupon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { QuillModule } from 'ngx-quill';
import { AddPromoOfferComponent } from './promo-offer/add-promo-offer/add-promo-offer.component';
import { AllPromoOfferComponent } from './promo-offer/all-promo-offer/all-promo-offer.component';
import { AddOfferComponent } from './multi-promo-offer/add-offer/add-offer.component';
import { AllOfferComponent } from './multi-promo-offer/all-offer/all-offer.component';
import { AddSpecialPackageComponent } from './special-package/add-special-package/add-special-package.component';
import { AllSpecialPackageComponent } from './special-package/all-special-package/all-special-package.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AddCouponComponent,
    AllCouponComponent,
    AddPromoOfferComponent,
    AllPromoOfferComponent,
    AddOfferComponent,
    AllOfferComponent,
    AddSpecialPackageComponent,
    AllSpecialPackageComponent,
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,

    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    QuillModule,
    PipesModule
  ]
})
export class OfferModule { }
