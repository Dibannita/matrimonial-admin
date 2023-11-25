import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {AllFoldersComponent} from './folder/all-folders/all-folders.component';
import {AddFolderComponent} from './folder/add-folder/add-folder.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AllImagesDialogComponent} from './images/all-images-dialog/all-images-dialog.component';
import {AllImagesComponent} from './images/all-images/all-images.component';
import {UploadImageComponent} from './images/upload-image/upload-image.component';
import {EditGalleryInfoComponent} from './edit-gallery-info/edit-gallery-info.component';
import {MaterialModule} from '../../material/material.module';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import {SwiperModule} from 'swiper/angular';


@NgModule({
  declarations: [
    AllFoldersComponent,
    AddFolderComponent,
    EditGalleryInfoComponent,
    AllImagesComponent,
    UploadImageComponent,
    AllImagesDialogComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxDropzoneModule,
    MatProgressBarModule,
    SwiperModule,
  ]
})
export class GalleryModule {
}
