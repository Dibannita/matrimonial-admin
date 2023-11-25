import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Blog} from 'src/app/interfaces/common/blog.interface';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BlogService} from '../../../../services/common/blog.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {AllImagesDialogComponent} from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {defaultUploadImage} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  blog?: Blog;
  autoSlug = true;

  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
  ) {
  }


  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getBlogById();
      }
    });
    this.autoGenerateSlug();
  }


  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null],
      slug: [null],
      priority: [null],
      shortDesc: [null],
      image: [null],
      mobileImage: [null],
      description: [null]
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.blog);

    if (this.blog && this.blog.image) {
      this.pickedImage = this.blog.image;
    }
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      console.log(this.dataForm.errors)
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.blog) {

      this.updateBlogById();

    } else {

      this.addBlog();

    }
  }

  /**
   * HTTP REQ HANDLE
   * getBlogById()
   * addBlog()
   * updateBlogById()
   */

  private getBlogById() {
    this.spinnerService.show();
    this.subDataOne = this.blogService.getBlogById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.data) {
            this.blog = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addBlog() {
    this.spinnerService.show();
    this.subDataTwo = this.blogService.addBlog(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.pickedImage = defaultUploadImage;
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

  private updateBlogById() {
    this.spinnerService.show();
    this.subDataThree = this.blogService.updateBlogById(this.blog._id, this.dataForm.value)
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
   * LOGICAL PART
   * autoGenerateSlug()
   */
      autoGenerateSlug() {
        if (this.autoSlug === true) {
          this.subAutoSlug = this.dataForm.get('name').valueChanges
            .pipe(
              // debounceTime(200),
              // distinctUntilChanged()
            ).subscribe(d => {
              const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
              this.dataForm.patchValue({
                slug: res
              });
            });
        } else {
          if (!this.subAutoSlug) {
            return;
          }
          this.subAutoSlug?.unsubscribe();
        }
      }


  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog(type: 'image' | 'mobileImage') {
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
          if (type === 'mobileImage') {
            this.dataForm.patchValue({mobileImage: image.url});
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({image: image.url});
            this.pickedImage = image.url;
          }
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
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if(this.subAutoSlug){
        this.subAutoSlug.unsubscribe();
    }
  }

}
