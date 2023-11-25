
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import {QuillModule} from 'ngx-quill';
import {AddDivisionComponent} from './division/add-division/add-division.component';
import {AllDivisionsComponent} from './division/all-divisions/all-divisions.component';
import {AddAreaComponent} from './area/add-area/add-area.component';
import {AllAreaComponent} from './area/all-area/all-area.component';
import {AllZoneComponent} from './zone/all-zone/all-zone.component';
import {AddZoneComponent} from './zone/add-zone/add-zone.component';


@NgModule({
  declarations: [
    AddDivisionComponent,
    AllDivisionsComponent,
    AddAreaComponent,
    AllAreaComponent,
    AllZoneComponent,
    AddZoneComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    QuillModule
  ]
})
export class AddressModule { }
