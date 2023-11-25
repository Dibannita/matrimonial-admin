import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddJobComponent} from "./add-job/add-job.component";
import {AllJobComponent} from "./all-job/all-job.component";

const routes: Routes = [
  {path: 'add-job', component: AddJobComponent},
  {path: 'edit-job/:id', component: AddJobComponent},
  {path: 'all-job', component: AllJobComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule {
}
