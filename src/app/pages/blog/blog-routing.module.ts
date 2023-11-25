import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllBlogComponent} from "./blog/all-blog/all-blog.component";
import {AddBlogComponent} from "./blog/add-blog/add-blog.component";

const routes: Routes = [
  {path: 'all-blog', component: AllBlogComponent},
  {path: 'add-blog', component: AddBlogComponent},
  {path: 'edit-blog/:id', component: AddBlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
