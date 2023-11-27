import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Select} from "../../../interfaces/core/select";
import {StorageService} from '../../../services/core/storage.service';
import {
  GROUP,
  HEIGHT_EDUCATION,
  HEIGHT_EDUCATION1, ISLAMIC_TITLE,
  LOW_EDUCATION1,
  Madrasha_EDUCATION1, RESULT
} from "../../../core/utils/app-data";


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
  dataForm!: FormGroup;
  isLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this.setData();
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_EDUCATION');
    if (data) {
      this.dataForm.setValue(data);
    }
  }

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

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_EDUCATION', this.dataForm.value)

      setTimeout(() => {
        this.isLoader = false;
        console.log(this.dataForm.value);
        this.router.navigate(['/matrimonial/pledge'], {queryParamsHandling: 'merge'});
      }, 500);
    }
    else {
      this.dataForm.markAllAsTouched();
    }
  }


  educationMethodData(event: any) {
    this.selectedType = event.target.value;
    this.heightEducationData = this.educationMethod.filter(item =>
      item.name === this.selectedType,
    );
  }


  heightEducationValue(event: any) {
    this.selectedEducationType = event.target.value;

    if(this.selectedEducationType !== 'এস.এস.সি এর নিচে'){

    }

    if(this.selectedEducationType !== 'এস.এস.সি এর নিচে'){
    }

  }


  // For form back button
  onGoBack() {
    history.back();
  }

}
