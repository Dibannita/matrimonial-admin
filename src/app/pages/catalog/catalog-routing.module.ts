import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { AllBrandComponent } from './brand/all-brand/all-brand.component';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import { AllTagComponent } from './tag/all-tag/all-tag.component';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { AllAuthorComponent } from './author/all-author/all-author.component';
import { AddPublisherComponent } from './publisher/add-publisher/add-publisher.component';
import { AllPublisherComponent } from './publisher/all-publisher/all-publisher.component';
import { AllCategoryComponent } from './category/all-category/all-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AllSubCategoryComponent } from './sub-category/all-sub-category/all-sub-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AddChildCategoryComponent } from './child-category/add-child-category/add-child-category.component';
import { AllChildCategoriesComponent } from './child-category/all-child-categories/all-child-categories.component';
import {AllJobTypeComponent} from "./job-type/all-job-type/all-job-type.component";
import {AddJobTypeComponent} from "./job-type/add-job-type/add-job-type.component";

const routes: Routes = [
  {path: 'all-categories', component: AllCategoryComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'edit-category/:id', component: AddCategoryComponent},

  {path: 'all-subCategories', component: AllSubCategoryComponent},
  {path: 'add-subCategory', component: AddSubCategoryComponent},
  {path: 'edit-subCategory/:id', component: AddSubCategoryComponent},

  {path: 'all-child-categories', component: AllChildCategoriesComponent},
  {path: 'add-child-category', component: AddChildCategoryComponent},
  {path: 'edit-child-category/:id', component: AddChildCategoryComponent},

  {path: 'all-publisher', component: AllPublisherComponent},
  {path: 'add-publisher', component: AddPublisherComponent},
  {path: 'edit-publisher/:id', component: AddPublisherComponent},
  {path: 'all-author', component: AllAuthorComponent},
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'edit-author/:id', component: AddAuthorComponent},
  {path: 'all-tag', component: AllTagComponent},
  {path: 'add-tag', component: AddTagComponent},
  {path: 'edit-tag/:id', component: AddTagComponent},
  {path: 'all-brand', component: AllBrandComponent},
  {path: 'add-brand', component: AddBrandComponent},
  {path: 'edit-brand/:id', component: AddBrandComponent},

  {path: 'all-job-type', component: AllJobTypeComponent},
  {path: 'add-job-type', component: AddJobTypeComponent},
  {path: 'edit-job-type/:id', component: AddJobTypeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
