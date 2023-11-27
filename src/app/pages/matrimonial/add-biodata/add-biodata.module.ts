import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBiodataRoutingModule } from './add-biodata-routing.module';
import { AddBiodataComponent } from './add-biodata.component';
import {MaterialModule} from "../../../material/material.module";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GeneralInfoComponent } from './general-info/general-info.component';
import { AddressComponent } from './address/address.component';
import { RouterModule } from '@angular/router';
import { EducationalQualificationComponent } from './educational-qualification/educational-qualification.component';
import { FamilyInfoComponent } from './family-info/family-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { OccupationalInfoComponent } from './occupational-info/occupational-info.component';
import { ContactComponent } from './contact/contact.component';
import { PledgeComponent } from './pledge/pledge.component';
import { ExpectedPartnerComponent } from './expected-partner/expected-partner.component';
import { MarriageInfoComponent } from './marriage-info/marriage-info.component';


@NgModule({
  declarations: [
    AddBiodataComponent,
    GeneralInfoComponent,
    AddressComponent,
    EducationalQualificationComponent,
    FamilyInfoComponent,
    PersonalInfoComponent,
    OccupationalInfoComponent,
    ContactComponent,
    PledgeComponent,
    ExpectedPartnerComponent,
    MarriageInfoComponent,
  ],
  imports: [
    CommonModule,
    AddBiodataRoutingModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AddBiodataModule { }
