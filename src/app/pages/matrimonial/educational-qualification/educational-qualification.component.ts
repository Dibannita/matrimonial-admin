import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Select} from "../../../interfaces/core/select";
import {EDUCATIONMETHOD, GROUP, HEIGHT_EDUCATION, ISLAMIC_TITLE, RESULT} from "../../../core/utils/app-data";
import {StorageService} from '../../../services/core/storage.service';


@Component({
  selector: 'app-educational-qualification',
  templateUrl: './educational-qualification.component.html',
  styleUrls: ['./educational-qualification.component.scss']
})
export class EducationalQualificationComponent implements OnInit {

  educationMethod: Select[] = EDUCATIONMETHOD;
  heightEducation: Select[] = HEIGHT_EDUCATION;
  groupData: Select[] = GROUP;
  resultData: Select[] = RESULT;
  islamicTitles: Select[] = ISLAMIC_TITLE;

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
      yourEducationMethod: ['', Validators.required],
      highestEducation: ['', Validators.required],
      sscPassingYear: [null, Validators.required],
      sscGroup: ['', Validators.required],
      sscResult: ['', Validators.required],
      diplomaSubject: [null, Validators.required],
      diplomaInstitution: [null, Validators.required],
      diplomaPassingYear: [null, Validators.required],
      otherEducationalQualifications: [null],
      islamicEducationalTitles: [null],
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

  // For form back button
  onGoBack() {
    history.back();
  }

}
