import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {AdditionalPage} from '../../../../interfaces/common/additional-page.interface';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {AdditionalPageService} from "../../../../services/common/additional-page.service";
// Quill.register('modules/blotFormatter', BlotFormatter);


@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  // Ngx Quill
  modules: any = null;

  // Store Data
  slug: string = null;
  pageInfo: AdditionalPage = null;

  // Data Form
  dataForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private uiService: UiService,
    private additionalPageService: AdditionalPageService,
  ) {
  }

  ngOnInit(): void {

    this.initQuillModule();
    this.initDataForm();

    this.activatedRoute.paramMap.subscribe(param => {
      this.slug = param.get('pageSlug');
      this.getPageInfo();
    });
  }

  /**
   * QUILL CONFIG
   * initQuillModule()
   */
  private initQuillModule() {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
          ['emoji'],
        ],
      }
    }


  }

  /**
   * FORM FUNCTIONS
   * initDataForm()
   * setFormData()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      isHtml: [null],
      htmlBase: [null],
    });
  }

  private setFormData() {
    this.dataForm.patchValue(this.pageInfo);
    if (this.pageInfo.isHtml) {
      this.dataForm.patchValue({htmlBase: this.pageInfo.description});
    }

  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete required fields');
      return;
    }
    this.addPageInfo();
  }

  /**
   * HTTP REQ HANDLE
   */

  private addPageInfo() {
    let finalData;
    if (this.pageInfo) {
      finalData = {...this.dataForm.value, ...{slug: this.slug, _id: this.pageInfo._id}};
    } else {
      finalData = {...this.dataForm.value, ...{slug: this.slug}};
    }

    this.additionalPageService.addAdditionalPage(finalData)
      .subscribe({
        next: (res => {
          console.log(res)
          this.uiService.success(res.message);
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  private getPageInfo() {
    this.additionalPageService.getAdditionalPageBySlug(this.slug)
      .subscribe({
        next: (res => {
          this.pageInfo = res.data;
          if (this.pageInfo) {
            this.setFormData();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  /**
   * HTML EDIT FUNCTIONS
   * onChangeBaseHtml()
   * onCheckChange()
   */

  onChangeBaseHtml(event: string) {
    this.dataForm.patchValue({
      description: event
    })
  }

  onCheckChange(event: MatCheckboxChange) {
    this.dataForm.patchValue({
      description: null,
      htmlBase: null
    })
  }
  ngOnDestroy() {

  }

}
