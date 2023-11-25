import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewsComponent} from './reviews.component';
import {ReplyReviewComponent} from './reply-review/reply-review.component';

const routes: Routes = [
  {path: '', component: ReviewsComponent},
  {path: 'reply-review/:id', component: ReplyReviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {
}
