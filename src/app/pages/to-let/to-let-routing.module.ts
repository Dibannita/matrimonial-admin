import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddToLetComponent} from "./add-to-let/add-to-let.component";
import {AllToLetComponent} from "./all-to-let/all-to-let.component";

const routes: Routes = [
  {path:'add-to-let',component:AddToLetComponent},
  {path:'edit-to-let/:id',component:AddToLetComponent},
  {path:'all-to-let',component:AllToLetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToLetRoutingModule { }
