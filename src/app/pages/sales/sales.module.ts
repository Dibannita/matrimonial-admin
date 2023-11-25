import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesRoutingModule} from './sales-routing.module';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {ProductListModule} from '../../shared/dialog-view/product-list/product-list.module';
import {UpdateOrderStatusComponent} from './update-order-status/update-order-status.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrderTimelineModule} from '../../shared/lazy/order-timeline/order-timeline.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { ProductVariationDialogComponent } from './product-variation-dialog/product-variation-dialog.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ShippingChargeComponent } from './shipping-charge/shipping-charge.component';


@NgModule({
  declarations: [
    AllOrdersComponent,
    AddOrderComponent,
    UpdateOrderStatusComponent,
    OrderDetailsComponent,
    ProductVariationDialogComponent,
    TransactionsComponent,
    ShippingChargeComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    ProductListModule,
    OrderTimelineModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ]
})
export class SalesModule { }
