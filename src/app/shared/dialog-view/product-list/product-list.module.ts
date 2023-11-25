import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {DirectivesModule} from '../../directives/directives.module';
import {PipesModule} from '../../pipes/pipes.module';
import {ProductDiscountDialogComponent} from './product-discount-dialog/product-discount-dialog.component';
import {DigitOnlyModule} from '@uiowa/digit-only';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDiscountDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    DirectivesModule,
    PipesModule,
    DigitOnlyModule
  ]
})
export class ProductListModule { }
