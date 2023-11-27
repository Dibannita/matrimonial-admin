import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { AddManagementComponent } from './add-management/add-management.component';
import { AllManagementComponent } from './all-management/all-management.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AddManagementComponent,
    AllManagementComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    NgxSpinnerModule,
    MatIconModule,
  ]
})
export class ManagementModule { }
