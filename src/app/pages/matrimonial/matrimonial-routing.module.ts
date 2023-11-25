import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddMatrimonialComponent} from "./add-matrimonial/add-matrimonial.component";
import {AllMatrimonialComponent} from "./all-matrimonial/all-matrimonial.component";
import {EducationalQualificationComponent} from "./educational-qualification/educational-qualification.component";
import {PledgeComponent} from "./pledge/pledge.component";
import {GeneralInfoComponent} from "./general-info/general-info.component";
import {AddressComponent} from "./address/address.component";
import {ContactComponent} from "./contact/contact.component";

// const routes: Routes = [
//
//   {path:'add-matrimonial',component:AddMatrimonialComponent},
//   {path:'edit-matrimonial/:id',component:AddMatrimonialComponent},
//   {path:'all-matrimonial',component:AllMatrimonialComponent}
// ];


const routes: Routes = [
  {
    path: 'add-matrimonial',
    component: AddMatrimonialComponent,
    children: [
      {
        path: "",
        redirectTo: "general-info",
        pathMatch: "full"
      },
      {
        path: "general-info",
        component: GeneralInfoComponent
      },
      {
        path: "general-info-edit/:id",
        component: GeneralInfoComponent
      },
      {
        path: "address",
        component: AddressComponent
      },
      {
        path: "educational-qualification",
        component: EducationalQualificationComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: "pledge",
        component: PledgeComponent
      }
    ]
  },
  {
    path: 'edit-matrimonial/:id',
    component: AddMatrimonialComponent,
    children: [
      {
        path: "",
        redirectTo: "general-info",
        pathMatch: "full"
      },
      {
        path: "general-info",
        component: GeneralInfoComponent
      },
      {
        path: "address",
        component: AddressComponent
      },
      {
        path: "educational-qualification",
        component: EducationalQualificationComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: "pledge",
        component: PledgeComponent
      }
    ]
  },
  {path:'all-matrimonial',component:AllMatrimonialComponent},
  // {path:'/:id',component:AddMatrimonialComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatrimonialRoutingModule { }
