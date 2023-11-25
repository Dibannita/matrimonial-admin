import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizationRoutingModule } from './customization-routing.module';
import { AddCarouselComponent } from './carousel/add-carousel/add-carousel.component';
import { AllCarouselsComponent } from './carousel/all-carousels/all-carousels.component';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { AllBannerComponent } from './banner/all-banner/all-banner.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { AllStoryComponent } from './story/all-story/all-story.component';
import { AddStoryComponent } from './story/add-story/add-story.component';

@NgModule({
  declarations: [
    AddCarouselComponent,
    AllCarouselsComponent,
    AddBannerComponent,
    AllBannerComponent,
    ShopInformationComponent,
    AllStoryComponent,
    AddStoryComponent
  ],
  imports: [
    CommonModule,
    CustomizationRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    NgxSpinnerModule,
    MatIconModule
  ]
})
export class CustomizationModule {}
