import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectControllerComponent } from './project-controller.component';
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
    ProjectControllerComponent
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
    ProjectControllerComponent
  ]
})
export class ProjectControllerModule { }
