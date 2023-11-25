import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Select} from "../../../interfaces/core/select";
import {BIODATA_TYPE, BLOODGROUP, COMPLEXION, HEIGHT, MARITALSTATUS} from "../../../core/utils/app-data";
import {StorageService} from '../../../services/core/storage.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  biodata: Select[] = BIODATA_TYPE;
  maritalStatus: Select[] = MARITALSTATUS;
  height: Select[] = HEIGHT;
  complexion: Select[] = COMPLEXION;
  bloodGroup: Select[] = BLOODGROUP;

  dataForm!: FormGroup;
  isLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
  ) {

  }

  ngOnInit(): void {
    this.initialForm();
    this.setData();
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_INPUT');
    if (data) {
      this.dataForm.setValue(data);
    }
  }


  initialForm() {
    this.dataForm = this.fb.group({
      bioDataType: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      birthDay: [null, Validators.required],
      height: ['', Validators.required],
      complexion: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationality: ['', Validators.required],
    })
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_INPUT', this.dataForm.value)
      setTimeout(() => {
        this.isLoader = false;
        console.log(this.dataForm.value);
        this.router.navigate(['/matrimonial/address'], {queryParamsHandling: 'merge'});
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
