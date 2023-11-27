import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBiodataComponent } from "./add-biodata.component";
import { AddressComponent } from './address/address.component';
import { EducationalQualificationComponent } from './educational-qualification/educational-qualification.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import {ContactComponent} from "./contact/contact.component";
import {PledgeComponent} from "./pledge/pledge.component";
import {FamilyInfoComponent} from "./family-info/family-info.component";
import {ExpectedPartnerComponent} from "./expected-partner/expected-partner.component";
import {MarriageInfoComponent} from "./marriage-info/marriage-info.component";

const routes: Routes = [
  {
    path: '',
    component: AddBiodataComponent,
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
        path: "family-info",
        component: FamilyInfoComponent
      },
      {
        path: "life-partner",
        component: ExpectedPartnerComponent
      },
      {
        path: "marriage-info",
        component: MarriageInfoComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBiodataRoutingModule { }
