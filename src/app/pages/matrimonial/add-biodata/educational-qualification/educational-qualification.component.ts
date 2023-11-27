import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select} from "../../../../interfaces/core/select";
import {EDUCATIONMETHOD, GROUP, HEIGHT_EDUCATION, ISLAMIC_TITLE, RESULT} from "../../../../core/db/all-info.db";
import {StorageService} from '../../../../services/core/storage.service';
import {Product} from '../../../../interfaces/common/product.interface';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../../services/common/product.service';
import {UiService} from '../../../../services/core/ui.service';
import {HEIGHT_EDUCATION1, LOW_EDUCATION1, Madrasha_EDUCATION1} from "../../../../core/utils/app-data";


@Component({
  selector: 'app-educational-qualification',
  templateUrl: './educational-qualification.component.html',
  styleUrls: ['./educational-qualification.component.scss']
})
export class EducationalQualificationComponent implements OnInit {

  underSscEducation: Select[] = LOW_EDUCATION1;
  educationMethod: any[] = HEIGHT_EDUCATION1;
  heightEducation: Select[] = HEIGHT_EDUCATION;
  madrashaEducation: Select[] = Madrasha_EDUCATION1;
  heightEducationData: any[] = [];
  groupData: Select[] = GROUP;
  resultData: Select[] = RESULT;
  islamicTitles: Select[] = ISLAMIC_TITLE;
  selectedType: string;
  selectedEducationType: string;
  id: string;
  private product: Product;
  dataForm: FormGroup;
  isLoader: boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.initialForm();

    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(qParamMap => {
      this.id = qParamMap.get('id');
      if (this.id) {
        this.getProductById();
      } else {
        this.setData();
      }
    })
  }



  /**
   * FORM METHODS
   * initialForm()
   * setData()
   * setFormData()
   * onFormSubmit()
   * onGoBack()
   */


  initialForm() {
    this.dataForm = this.fb.group({
      yourEducationMethod: [null],
      highestEducation: [null],
      sscPassingYear: [null],
      sscGroup: [null],
      sscResult: [null],
      diplomaSubject: [null],
      diplomaInstitution: [null],
      diplomaPassingYear: [null],
      otherEducationalQualifications: [null],
      islamicEducationalTitles: [null],
      underSSC: [null],
      konYearDiploma: [null],
      hscPassingYear: [null],
      hscResult: [null],
      hscGroup: [null],
      snakottoBisoi: [null],
      snakonttoPassingYear: [null],
      snatokPassingYear: [null],
      snatokInstitute: [null],
      snatokBisoi: [null],
      doctoretPassingYear: [null],
      doctoretInstitute: [null],
      doctoretBisoi: [null],
      ebadahoEducation: [null],
      ebadahoFolafol: [null],
      ebadahoPassingYear: [null],
      taksuPassingYear: [null],
      taksuEducation: [null],
      taksuFolafol: [null],
      taksuInstitution: [null],
      takmilPassingYear: [null],
      takmilFolafol: [null],
      takmilEducation: [null],
      fojilotPassingYear: [null],
      fojilotFolafol: [null],
      fojilotEducation: [null],
      saniPassingYear: [null],
      saniFolafol: [null],
      saniEducation: [null],
      muftiPassingYear: [null],
      muftiFolafol: [null],
      muftiEducation: [null],
      passingYearHSC: [null],
      groupHSC: [null],
      resultHSC: [null],
      snakottoBosor: [null],
      snakottoInstiute: [null],

    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_EDUCATION');
    if (data) {
      this.dataForm.setValue(data);
    }
  }

  private setFormData() {
    if (this.product) {
      this.dataForm.patchValue(this.product);
    }
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      if (this.id) {
        this.updateProductByUser();
      } else {
        this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_EDUCATION', this.dataForm.value)

        setTimeout(() => {
          this.isLoader = false;
          console.log(this.dataForm.value);
          this.router.navigate(['/add-biodata/family-info'], {queryParamsHandling: 'merge'});
        }, 500);
      }

    }
    else {
      this.dataForm.markAllAsTouched();
    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

  /**
   * HTTP REQ HANDLE
   * getProductById()
   * updateProductByUser()
   */
  private getProductById() {
    const select = 'konYearDiploma snatokBisoi snatokInstitute snatokPassingYear snakonttoPassingYear snakottoBisoi snakottoInstiute snakottoBosor underSSC passingYearHSC resultHSC groupHSC doctoretInstitute doctoretBisoi ebadahoEducation ebadahoFolafol ebadahoPassingYear muftiEducation muftiFolafol fojilotEducation takmilPassingYear taksuInstitution taksuEducation taksuFolafol taksuPassingYear doctoretPassingYear fojilotFolafol fojilotPassingYear takmilEducation takmilFolafol muftiPassingYear saniEducation saniFolafol saniPassingYear yourEducationMethod highestEducation sscPassingYear sscGroup sscResult diplomaSubject diplomaInstitution diplomaPassingYear otherEducationalQualifications islamicEducationalTitles'
    this.subDataOne = this.productService.getProductById(this.id, select).subscribe({
      next: res => {
        if (res.success) {
          this.product = res.data;
          this.setFormData();
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private updateProductByUser() {
    this.subDataTwo = this.productService.updateProductById(this.id, this.dataForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          this.router.navigate(['/add-biodata/family-info'], {queryParamsHandling: 'merge'});
        }
      },
      error: err => {
        this.isLoader = false;
        console.log(err)
      }
    })

  }


  educationMethodData(event: any) {
    this.selectedType = event.target.value;
    this.heightEducationData = this.educationMethod.filter(item =>
      item.name === this.selectedType,
    );
  }

  isValue= false;

  heightEducationValue(event: any) {
    this.selectedEducationType = event.target.value;

    if(this.selectedEducationType !== 'এস.এস.সি এর নিচে'){
      this.isValue = true;
    }

    if(this.selectedEducationType !== 'এস.এস.সি এর নিচে'){
      this.isValue = true;
    }

  }
  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }


}
