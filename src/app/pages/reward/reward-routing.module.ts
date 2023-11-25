import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllRewardComponent} from './all-reward/all-reward.component';

const routes: Routes = [
  {
    path: '',
    component: AllRewardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule {
}
