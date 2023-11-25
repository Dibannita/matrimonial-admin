import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageListComponent} from "./page-list/page-list.component";
import {ViewPageComponent} from "./page-list/view-page/view-page.component";

const routes: Routes = [
  {path: 'page-list', component: PageListComponent},
  {path: 'view/:pageSlug', component: ViewPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionlPageRoutingModule {
}
