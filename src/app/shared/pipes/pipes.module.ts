import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberMinDigitPipe} from './number-min-digit.pipe';
import {SecToTimePipe} from './sec-to-time.pipe';
import { OrderStatusPipe } from './order-status.pipe';
import { PricePipe } from './price.pipe';
import { CheckNullPipe } from './check-null.pipe';
import { ProductDiscountViewPipe } from './product-discount-view.pipe';
import { SlugToNormalPipe } from './slug-to-normal.pipe';


@NgModule({
  declarations: [
    NumberMinDigitPipe,
    SecToTimePipe,
    OrderStatusPipe,
    PricePipe,
    CheckNullPipe,
    ProductDiscountViewPipe,
    SlugToNormalPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberMinDigitPipe,
    SecToTimePipe,
    OrderStatusPipe,
    PricePipe,
    CheckNullPipe,
    ProductDiscountViewPipe,
    SlugToNormalPipe,
  ]
})
export class PipesModule {
}
