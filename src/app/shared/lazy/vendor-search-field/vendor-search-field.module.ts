import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorSearchFieldComponent} from './vendor-search-field.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    VendorSearchFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    VendorSearchFieldComponent
  ]
})
export class VendorSearchFieldModule {
}
