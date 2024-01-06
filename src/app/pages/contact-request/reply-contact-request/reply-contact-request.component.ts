import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/core/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '../../../interfaces/core/select';
import { UtilsService } from '../../../services/core/utils.service';
import { ContactRequest } from '../../../interfaces/common/contact-request.interface';
import { ContactRequestService } from '../../../services/common/contact-request.service';
import { StorageService } from '../../../services/core/storage.service';

@Component({
  selector: 'app-reply-contact-request',
  templateUrl: './reply-contact-request.component.html',
  styleUrls: ['./reply-contact-request.component.scss'],
})
export class ReplyContactRequestComponent implements OnInit {
  // Form Template Ref
  @ViewChild('templateForm') templateForm: NgForm;

  dataForm?: FormGroup;
  private sub: Subscription;

  isLoading: any;

  // Store Data from param
  id?: string;
  contactRequest: ContactRequest = null;

  contactRequestStatus: Select[] = [
    { value: false, viewValue: 'Not Approve' },
    { value: true, viewValue: 'Approve' },
  ];

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private utilsService: UtilsService,
    private storageService: StorageService,
    private contactRequestService: ContactRequestService
  ) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      status: [null, Validators.required],
      guardianName: [null],
      guardianPhoneNo: [null],
    });

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getContactRequestByContactRequestId();
      }
    });
  }

  /**
   * SET FORM DATA
   */
  private setFormData() {
    this.dataForm.patchValue({
      status: this.contactRequest.status,
      guardianName: this.contactRequest.guardianName,
      guardianPhoneNo: this.contactRequest.guardianPhoneNo,
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }
    const finalData = {
      ...this.dataForm.value,
      ...{
        _id: this.contactRequest._id,
        replyDate: this.utilsService.getDateString(new Date()),
      },
    };

    this.editContactRequest(finalData);
  }

  /**
   * HTTP REQ
   */

  private getContactRequestByContactRequestId() {
    this.contactRequestService
      .getContactRequestByContactRequestId(this.id)
      .subscribe(
        (res) => {
          this.contactRequest = res.data;
          this.setFormData();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private editContactRequest(data: ContactRequest) {
    this.contactRequestService.editContactRequest(data).subscribe(
      (res) => {
        this.uiService.success(res.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
