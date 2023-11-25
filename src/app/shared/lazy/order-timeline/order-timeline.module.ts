import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTimelineComponent } from './order-timeline.component';



@NgModule({
    declarations: [
        OrderTimelineComponent
    ],
    exports: [
        OrderTimelineComponent
    ],
    imports: [
        CommonModule
    ]
})
export class OrderTimelineModule { }
