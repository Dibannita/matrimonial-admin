import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageLoadErrorDirective} from './image-load-error.directive';
import {ImageProfileErrorDirective} from "./image-profile-error.directive";
import {NoWhitespaceDirective} from "./no-whitespace.directive";
import {AutoSlugDirective} from "./auto-slug.directive";



@NgModule({
  declarations: [
    ImageLoadErrorDirective,
    ImageProfileErrorDirective,
    NoWhitespaceDirective,
    AutoSlugDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageLoadErrorDirective,
    ImageProfileErrorDirective,
    NoWhitespaceDirective,
    AutoSlugDirective
  ]
})
export class DirectivesModule { }
