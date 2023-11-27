import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRequestRoutingModule } from './contact-request-routing.module';
import { ContactRequestComponent } from './contact-request.component';
import { ReplyContactRequestComponent } from './reply-contact-request/reply-contact-request.component';
import {MaterialModule} from "../../material/material.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ContactRequestComponent,
    ReplyContactRequestComponent
  ],
  imports: [
    CommonModule,
    ContactRequestRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class ContactRequestModule { }
