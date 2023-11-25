import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AllProductComponent } from './all-product/all-product.component';
import { AddProductComponent } from './add-product/add-product.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AuthorSelectModule } from '../../shared/lazy/author-select/author-select.module';
import { PublisherSelectModule } from "../../shared/lazy/publisher-select/publisher-select.module";
import { CategorySelectModule } from '../../shared/lazy/category-select/category-select.module';
import { BrandSelectModule } from 'src/app/shared/lazy/brand-select/brand-select.module';
import { QuillEditorComponent } from "ngx-quill";
import { SubCategorySelectModule } from 'src/app/shared/lazy/sub-category-select/sub-category-select.module';
import { ChildCategorySelectModule } from 'src/app/shared/lazy/child-category-select/child-category-select.module';

@NgModule({
  declarations: [
    AllProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
    ChildCategorySelectModule,
    ReactiveFormsModule,


  ]
})
export class ProductModule { }
