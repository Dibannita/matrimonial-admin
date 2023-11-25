import {Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../../services/core/ui.service';
import {Review} from '../../interfaces/common/review.interface';
import {ReviewService} from '../../services/common/review.service';
import {ReloadService} from '../../services/core/reload.service';

// @ts-ignore
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  allReviews: Review[] = [];
  reviewData: Review;
  reviewId: string;

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private uiService: UiService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllReviews();
      });
    this.getAllReviews();
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(data?: string) {
    this.reviewId = data;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.getAllReviews();
        // this.updateReviewAndDelete();
      }
    });
  }

  // openComponentDialog(product: string) {
  //
  // }

  /**
   * HTTP REQ HANDLE
   */

  private getAllReviews() {
    this.reviewService.getAllReviews()
      .subscribe(res => {
        this.allReviews = res.data;

        this.reviewData = this.allReviews.find(m => m._id === this.reviewId)
        console.log("idddd+++", this.reviewId)
        console.log("reviewDat+++a", this.reviewData)


        if (this.reviewData) {

          this.updateReviewAndDelete()
        }
      }, error => {
        console.log(error);
      });
  }


  private updateReviewAndDelete() {
    console.log("hhhh")
    console.log("idddd", this.reviewId)
    console.log("reviewData", this.reviewData)
    this.reviewService.updateReviewAndDelete(this.reviewData)
      .subscribe(res => {
        // this.uiService.success(res.message);
        this.deleteReviewByReviewId()
      }, error => {
        console.log(error);
      });
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteReviewByReviewId() {
    this.reviewService.deleteReviewByReviewId(this.reviewId)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshData$();
      }, error => {
        console.log(error);
      });
  }
}
