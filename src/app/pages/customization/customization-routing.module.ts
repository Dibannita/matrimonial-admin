import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { AllBannerComponent } from './banner/all-banner/all-banner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarouselComponent } from './carousel/add-carousel/add-carousel.component';
import { AllCarouselsComponent } from './carousel/all-carousels/all-carousels.component';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { AddStoryComponent } from './story/add-story/add-story.component';
import { AllStoryComponent } from './story/all-story/all-story.component';

const routes: Routes = [
  { path: 'all-carousels', component: AllCarouselsComponent },
  { path: 'add-carousel', component: AddCarouselComponent },
  { path: 'edit-carousel/:id', component: AddCarouselComponent },
  {path: 'shop-information', component: ShopInformationComponent},
  { path: 'all-banner', component: AllBannerComponent },
  { path: 'add-banner', component: AddBannerComponent },
  { path: 'edit-banner/:id', component: AddBannerComponent },
  {path: 'all-story', component: AllStoryComponent},
  {path: 'add-story', component: AddStoryComponent},
  {path: 'edit-story/:id', component: AddStoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomizationRoutingModule {}
