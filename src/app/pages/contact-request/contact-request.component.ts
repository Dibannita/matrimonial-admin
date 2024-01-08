import { Component, OnInit } from '@angular/core';
import { ContactRequest } from '../../interfaces/common/contact-request.interface';
import { MatDialog } from '@angular/material/dialog';
import { ContactRequestService } from '../../services/common/contact-request.service';
import { UiService } from '../../services/core/ui.service';
import { ReloadService } from '../../services/core/reload.service';
import { ConfirmDialogComponent } from '../../shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contact-request',
  templateUrl: './contact-request.component.html',
  styleUrls: ['./contact-request.component.scss'],
})
export class ContactRequestComponent implements OnInit {
  allContactRequests: ContactRequest[] = [];
  contactRequestData: ContactRequest;
  contactRequestId: string;

  constructor(
    private dialog: MatDialog,
    private contactRequestService: ContactRequestService,

    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.reloadService.refreshData$.subscribe(() => {
      this.getAllContactRequests();
    });
    this.getAllContactRequests();
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(data?: string) {
    this.contactRequestId = data;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.getAllContactRequests();
        // this.updateContactRequestAndDelete();
      }
    });
  }

  /**
   * HTTP REQ HANDLE
   */

  private getAllContactRequests() {
    this.contactRequestService.getAllContactRequests().subscribe(
      (res) => {
        this.allContactRequests = res.data;
        console.log('allContactRequests', this.allContactRequests);
        this.contactRequestData = this.allContactRequests.find(
          (m) => m._id === this.contactRequestId
        );
        console.log('idddd+++', this.contactRequestId);
        console.log('contactRequestDat+++a', this.contactRequestData);

        // if (this.contactRequestData) {
        //   // this.updateContactRequestAndDelete();
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // private updateContactRequestAndDelete() {
  //   console.log('hhhh');
  //   console.log('idddd', this.contactRequestId);
  //   console.log('contactRequestData', this.contactRequestData);
  //   this.contactRequestService
  //     .updateContactRequestAndDelete(this.contactRequestData)
  //     .subscribe(
  //       (res) => {
  //         // this.uiService.success(res.message);
  //         this.deleteContactRequestByContactRequestId();
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  /**
   * DELETE METHOD HERE
   */
  // private deleteContactRequestByContactRequestId() {
  //   this.contactRequestService
  //     .deleteContactRequestByContactRequestId(this.contactRequestId)
  //     .subscribe(
  //       (res) => {
  //         this.uiService.success(res.message);
  //         this.reloadService.needRefreshData$();
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
}
