import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UiService } from '../../../services/core/ui.service';
import { Project } from '../../../interfaces/common/project.interface';

@Component({
  selector: 'app-project-controller',
  templateUrl: './project-controller.component.html',
  styleUrls: ['./project-controller.component.scss'],
})
export class ProjectControllerComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  project: Project;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public dialogRef: MatDialogRef<ProjectControllerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();
    if (this.data) {
      this.project = this.data;
      this.setFormValue();
    }
  }

  /**
   * INIT FORM & Submit
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      note: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.project);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    this.dialogRef.close({
      data: this.dataForm.value,
    });
  }

  /**
   * ON CLOSE DIALOG
   */
  onClose() {
    this.dialogRef.close();
  }
}
