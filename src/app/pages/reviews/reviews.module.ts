import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewsRoutingModule} from './reviews-routing.module';
import {ReviewsComponent} from './reviews.component';
import {ReplyReviewComponent} from './reply-review/reply-review.component';
import {MaterialModule} from '../../material/material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ReviewsComponent,
    ReplyReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class ReviewsModule {
}
