import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatrimonialRoutingModule } from './matrimonial-routing.module';
import { AddMatrimonialComponent } from './add-matrimonial/add-matrimonial.component';
import { AllMatrimonialComponent } from './all-matrimonial/all-matrimonial.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {AuthorSelectModule} from "../../shared/lazy/author-select/author-select.module";
import {BrandSelectModule} from "../../shared/lazy/brand-select/brand-select.module";
import {PublisherSelectModule} from "../../shared/lazy/publisher-select/publisher-select.module";
import {CategorySelectModule} from "../../shared/lazy/category-select/category-select.module";
import {QuillEditorComponent} from "ngx-quill";
import {SubCategorySelectModule} from "../../shared/lazy/sub-category-select/sub-category-select.module";
import {ChildCategorySelectModule} from "../../shared/lazy/child-category-select/child-category-select.module";
import {EducationalQualificationComponent} from "./educational-qualification/educational-qualification.component";
import {OccupationalInfoComponent} from "./occupational-info/occupational-info.component";
import {PledgeComponent} from "./pledge/pledge.component";
import {GeneralInfoComponent} from "./general-info/general-info.component";
import {AddressComponent} from "./address/address.component";
import {ContactComponent} from "./contact/contact.component";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {FamilyInfoComponent} from "./family-info/family-info.component";


@NgModule({
  declarations: [
    AddMatrimonialComponent,
    AllMatrimonialComponent,
    GeneralInfoComponent,
    AddressComponent,
    EducationalQualificationComponent,
    FamilyInfoComponent,
    PersonalInfoComponent,
    OccupationalInfoComponent,
    ContactComponent,
    PledgeComponent
  ],
  imports: [
    CommonModule,
    MatrimonialRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    PipesModule,
    FlexLayoutModule,
    DigitOnlyModule,
    AuthorSelectModule,
    BrandSelectModule,
    PublisherSelectModule,
    CategorySelectModule,
    QuillEditorComponent,
    SubCategorySelectModule,
    ChildCategorySelectModule
  ]
})
export class MatrimonialModule { }
