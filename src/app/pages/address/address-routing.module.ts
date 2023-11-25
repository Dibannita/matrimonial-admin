import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllDivisionsComponent} from './division/all-divisions/all-divisions.component';
import {AddDivisionComponent} from './division/add-division/add-division.component';
import {AllAreaComponent} from './area/all-area/all-area.component';
import {AddAreaComponent} from './area/add-area/add-area.component';
import {AllZoneComponent} from './zone/all-zone/all-zone.component';
import {AddZoneComponent} from './zone/add-zone/add-zone.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-divisions', pathMatch: 'full'},
  {path: 'all-divisions', component: AllDivisionsComponent},
  {path: 'add-division', component: AddDivisionComponent},
  {path: 'edit-division/:id', component: AddDivisionComponent},

  {path: 'all-area', component: AllAreaComponent},
  {path: 'add-area', component: AddAreaComponent},
  {path: 'edit-area/:id', component: AddAreaComponent},

  {path: 'all-zone', component: AllZoneComponent},
  {path: 'add-zone', component: AddZoneComponent},
  {path: 'edit-zone/:id', component: AddZoneComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {
}
