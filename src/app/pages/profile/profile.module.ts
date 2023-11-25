import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropComponent} from './image-crop/image-crop.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AdminChangePasswordComponent} from './user-change-password/admin-change-password.component';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProfileComponent,
    ImageCropComponent,
    AdminChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProfileModule {
}
