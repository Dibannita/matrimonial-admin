import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllSeoPageComponent} from './seo-page/all-seo-page/all-seo-page.component';
import {AddSeoPageComponent} from './seo-page/add-seo-page/add-seo-page.component';

const routes: Routes = [
  {path: 'all-seo-page', component: AllSeoPageComponent},
  {path: 'add-seo-page', component: AddSeoPageComponent},
  {path: 'edit-seo-page/:id', component: AddSeoPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeoPageRoutingModule { }
