import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactRequestComponent} from "./contact-request.component";
import {ReplyContactRequestComponent} from "./reply-contact-request/reply-contact-request.component";

const routes: Routes = [
  {path: '', component: ContactRequestComponent},
  {path: 'reply-contact-request/:id', component: ReplyContactRequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRequestRoutingModule { }
