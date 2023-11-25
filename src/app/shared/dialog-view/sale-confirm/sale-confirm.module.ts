import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleConfirmComponent } from './sale-confirm.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    SaleConfirmComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SaleConfirmComponent
  ]
})
export class SaleConfirmModule { }
