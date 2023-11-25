import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {MaterialModule} from 'src/app/material/material.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {DirectivesModule} from 'src/app/shared/directives/directives.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AllAdminsComponent} from './all-admins/all-admins.component';
import {AdminControlRoutingModule} from './admin-control-routing.module';
import {AddAdminComponent} from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    AllAdminsComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    AdminControlRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class AdminControlModule {
}
