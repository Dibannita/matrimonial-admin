import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {StoryService} from '../../../../services/common/story.service';
import {UtilsService} from '../../../../services/core/utils.service';
import {Story} from '../../../../interfaces/common/story.interface';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../core/utils/app-data';
import {Select} from '../../../../interfaces/core/select';
import { UiService } from 'src/app/services/core/ui.service';
import { AllImagesDialogComponent } from 'src/app/pages/gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit, OnDestroy {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  story?: Story;

  // Static data
  storyTypes: Select[] = [
    {value: 'youtube', viewValue: 'YouTube'},
  ]

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private storyService: StoryService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getStoryById();
      }
    });
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
   private initDataForm() {
    this.dataForm = this.fb.group({
      title: [null, Validators.required],
      image: [null],
      url: [null],
      type: [null],
    });
  }
   private setFormValue() {
    if (this.story && this.story.image) {
      this.pickedImage = this.story.image;
    }
    this.dataForm.patchValue({...this.story});
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    // Create Angular Route Url from Url
    const mUrl = this.utilsService.urlToRouter(this.dataForm.value.url, true);
    const mData = {...this.dataForm.value, ...{url: mUrl}};

    if (this.story) {
      this.updateStoryById(mData);
    } else {
      this.addStory(mData);

    }

  }

  /**
   * HTTP REQ HANDLE
   * getStoryById
   * addStory
   * updateStoryById
   */
  private getStoryById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.storyService.getStoryById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.story = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addStory(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.storyService.addStory(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.pickedImage = defaultUploadImage;
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateStoryById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.storyService.updateStoryById(this.story._id, data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          this.dataForm.patchValue({image: image.url});
          this.pickedImage = image.url;
        }
      }
    });
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
  }

}
