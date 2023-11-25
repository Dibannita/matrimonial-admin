import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { AdditionlPageRoutingModule } from './additionl-page-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { ViewPageComponent } from './page-list/view-page/view-page.component';
import { ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {TextFieldModule} from '@angular/cdk/text-field';
import {QuillEditorComponent} from "ngx-quill";

@NgModule({
  declarations: [
    PageListComponent,
    ViewPageComponent,
  ],
    imports: [
        CommonModule,
        AdditionlPageRoutingModule,
        MatCardModule,
        MatListModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        PipesModule,
        TextFieldModule,
        QuillEditorComponent
    ]
})
export class AdditionlPageModule { }
