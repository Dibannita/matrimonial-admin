import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ShippingChargeComponent } from './shipping-charge/shipping-charge.component';

const routes: Routes = [
  // {path: '', redirectTo: 'all-orders'},
  {path: 'all-orders', component: AllOrdersComponent},
  {path: 'add-order', component: AddOrderComponent},
  {path: 'transaction', component: TransactionsComponent},
  {path: 'edit-order/:id', component: AddOrderComponent},
  {path: 'order-details/:id', component: OrderDetailsComponent},
  {path: 'shipping-charge', component: ShippingChargeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
