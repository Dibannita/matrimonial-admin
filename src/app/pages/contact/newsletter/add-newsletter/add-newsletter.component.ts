import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Newsletter} from 'src/app/interfaces/common/newsletter.interface';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NewsletterService} from '../../../../services/common/newsletter.service';

@Component({
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.component.html',
  styleUrls: ['./add-newsletter.component.scss']
})
export class AddNewsletterComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  newsletter?: Newsletter;

  // Image Upload
  files: File[] = [];
  pickedImage: any[] = [];
  oldImage: string[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private newsletterService: NewsletterService,
  ) {
  }


  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getNewsletterById();
      }
    });
  }


  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      email: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.newsletter);
    if (this.newsletter && this.newsletter.email) {
      this.oldImage.push(this.newsletter.email);
    }
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      console.log(this.dataForm.errors)
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.newsletter) {

      this.updateNewsletterById();

    } else {
      this.addNewsletter();

    }
  }

  /**
   * HTTP REQ HANDLE
   * getNewsletterById()
   * addNewsletter()
   * updateNewsletterById()
   */

  private getNewsletterById() {
    this.spinnerService.show();
    this.subDataOne = this.newsletterService.getNewsletterById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.data) {
            this.newsletter = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addNewsletter() {
    this.spinnerService.show();
    this.subDataTwo = this.newsletterService.addNewsletter(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private updateNewsletterById() {
    this.spinnerService.show();
    this.subDataThree = this.newsletterService.updateNewsletterById(this.newsletter._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);

          } else {
            this.uiService.warn(res.message);
          }

        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }


  /**
   * IMAGE UPLOAD
   * onSelect()
   */

  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);
  }

  /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }

}
