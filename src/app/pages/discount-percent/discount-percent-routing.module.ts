import { AddDiscountComponent } from './add-discount/add-discount.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDiscountComponent } from './all-discount/all-discount.component';

const routes: Routes = [


  {path: 'all-discount', component: AllDiscountComponent},
  {path: 'add-discount', component: AddDiscountComponent},
  {path: 'edit-discount/:id', component: AddDiscountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountPercentRoutingModule { }
