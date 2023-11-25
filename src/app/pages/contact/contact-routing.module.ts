import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllContactComponent} from "../contact/contact/all-contact/all-contact.component";
import {AddContactComponent} from "../contact/contact/add-contact/add-contact.component";
import {AddNewsletterComponent} from "./newsletter/add-newsletter/add-newsletter.component";
import {AllNewsletterComponent} from "./newsletter/all-newsletter/all-newsletter.component";

const routes: Routes = [
  {path: 'all-contact', component: AllContactComponent},
  {path: 'add-contact', component: AddContactComponent},
  {path: 'edit-contact/:id', component: AddContactComponent},
  {path: 'all-newsletter', component: AllNewsletterComponent},
  {path: 'add-newsletter', component: AddNewsletterComponent},
  {path: 'edit-newsletter/:id', component: AddNewsletterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
