import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskControllerComponent } from './task-controller.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    TaskControllerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DigitOnlyModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    TaskControllerComponent
  ]
})
export class TaskControllerModule { }
