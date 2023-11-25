import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {AddUserComponent} from './add-user/add-user.component';
import {UserComponent} from './user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from "ngx-pagination";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NoContentModule} from "../../shared/lazy/no-content/no-content.module";
import {MatButtonModule} from "@angular/material/button";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";
import {DigitOnlyModule} from "@uiowa/digit-only";


@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    UserComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        NgxPaginationModule,
        MatCheckboxModule,
        NoContentModule,
        MatButtonModule,


        NgxDropzoneModule,
        FormsModule,
        NgxPaginationModule,
        MaterialModule,
        DirectivesModule,
        DigitOnlyModule,
    ],
})
export class UserModule {
}
