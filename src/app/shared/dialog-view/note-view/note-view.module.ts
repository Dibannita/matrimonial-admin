import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteViewComponent } from './note-view.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    NoteViewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NoteViewComponent
  ]
})
export class NoteViewModule { }
