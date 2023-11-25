import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../interfaces/common/order.interface';
import { OrderStatus } from '../../../enum/order.enum';
import { ORDER_STATUS } from '../../../core/utils/app-data';
import { Select } from '../../../interfaces/core/select';

@Component({
  selector: 'app-order-timeline',
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.scss'],
})
export class OrderTimelineComponent implements OnInit {
  @Input() order: Order = null;

  public OrderStatusEnum = OrderStatus;

  public orderStatus: Select[] = ORDER_STATUS;

  constructor() {}

  ngOnInit(): void {}
}
