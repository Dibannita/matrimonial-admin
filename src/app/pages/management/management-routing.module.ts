import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllManagementComponent} from "./all-management/all-management.component";
import {AddManagementComponent} from "./add-management/add-management.component";

const routes: Routes = [
  { path: 'all-management', component: AllManagementComponent },
  { path: 'add-management', component: AddManagementComponent },
  { path: 'edit-management/:id', component: AddManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
