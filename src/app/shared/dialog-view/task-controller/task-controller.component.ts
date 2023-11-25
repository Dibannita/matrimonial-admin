import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UiService} from '../../../services/core/ui.service';

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Task} from '../../../interfaces/common/task.interface'

import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {Project} from '../../../interfaces/common/project.interface';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-task-controller',
  templateUrl: './task-controller.component.html',
  styleUrls: ['./task-controller.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TaskControllerComponent implements OnInit {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;


  // Store Data
  task: Task;
  today = moment();
  projects: Project[] = [];


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public dialogRef: MatDialogRef<TaskControllerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task?: Task, projects: Project[]},
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    if (this.data && this.data.projects) {
      this.projects = this.data.projects;
    }

    if (this.data && this.data.task) {
      this.task = this.data.task;
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
      project: [null],
      date: [this.today, Validators.required],
      time: [null],
      checked: [false],
      note: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.task)
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    this.dialogRef.close({
      data: this.dataForm.value
    })
  }

  /**
   * ON CLOSE DIALOG
   */
  onClose() {
    this.dialogRef.close()
  }

}
