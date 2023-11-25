import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact-routing.module';
import {AddContactComponent} from './contact/add-contact/add-contact.component';
import {AllContactComponent} from './contact/all-contact/all-contact.component';
import {AllNewsletterComponent} from './newsletter/all-newsletter/all-newsletter.component';
import {AddNewsletterComponent} from './newsletter/add-newsletter/add-newsletter.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";


@NgModule({
  declarations: [
    AddContactComponent,
    AllContactComponent,
    AllNewsletterComponent,
    AddNewsletterComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
  ]
})
export class ContactModule {
}
