import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobComponent } from './all-job/all-job.component';
import { AddJobComponent } from './add-job/add-job.component';
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


@NgModule({
  declarations: [
    AllJobComponent,
    AddJobComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
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
export class JobModule { }
