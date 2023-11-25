import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { AllRewardComponent } from './all-reward/all-reward.component';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AllRewardComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
    MaterialModule,
    FormsModule,

  ]
})
export class RewardModule { }
