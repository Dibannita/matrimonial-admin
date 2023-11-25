import {Component, OnInit} from '@angular/core';
import {Select} from "../../../interfaces/core/select";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from '../../../services/core/storage.service';
import {AGREE} from "../../../core/utils/app-data";

@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.scss']
})
export class PledgeComponent implements OnInit {
  agree: Select[] = AGREE;
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
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_PLEDGE');
    if (data) {
      this.dataForm.setValue(data);
    }
  }
  initialForm() {
    this.dataForm = this.fb.group({
      submitBiodataWeb: ['', Validators.required],
      infoTrue: ['', Validators.required],
      agree: [null, Validators.required],
    });
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_PLEDGE', this.dataForm.value)
      setTimeout(() => {
        this.isLoader = false;
        console.log(this.dataForm.value);
        this.router.navigate(['/matrimonial/contact'], {queryParamsHandling: 'merge'});
      }, 500);
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

}
