import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {StorageService} from '../../../services/core/storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  dataForm!: FormGroup;
  permanentAddressCheck: boolean = true;

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
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_ADDRESS');
    if (data) {
      this.dataForm.setValue(data);
    }
  }


  initialForm() {
    this.dataForm = this.fb.group({
      permanentAddress: [null, Validators.required],
      permanentAddressArea: [null, Validators.required],
      presentAddress: [!this.permanentAddressCheck ? '' : 'Same Address', Validators.required],
      presentAddressArea: [!this.permanentAddressCheck ? '' : 'Same Address', Validators.required],
      whereDidYouGrowUp: [null, Validators.required]
    })

  }

  onPermanentAddressCheck() {
    this.permanentAddressCheck = !this.permanentAddressCheck;
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_ADDRESS', this.dataForm.value)
      setTimeout(() => {
        this.isLoader = false;
        console.log(this.dataForm.value);
        this.router.navigate(['/matrimonial/educational-qualification'], {queryParamsHandling: 'merge'});
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
