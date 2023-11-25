import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog-routing.module';
import {AddBlogComponent} from './blog/add-blog/add-blog.component';
import {AllBlogComponent} from './blog/all-blog/all-blog.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";


@NgModule({
  declarations: [
    AddBlogComponent,
    AllBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
  ]
})
export class BlogModule {
}
