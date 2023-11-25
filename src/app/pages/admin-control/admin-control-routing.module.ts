import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllAdminsComponent} from './all-admins/all-admins.component';
import {AddAdminComponent} from './add-admin/add-admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-admins', pathMatch: 'full'},
  {path: 'all-admins', component: AllAdminsComponent},
  {path: 'add-new-admin', component: AddAdminComponent},
  {path: 'edit-admin/:id', component: AddAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminControlRoutingModule {
}
