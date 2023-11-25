import { Injectable } from '@angular/core';
import {OrderStatus} from '../../enum/order.enum';

@Injectable({
  providedIn: 'root'
})
export class NgClassService {

  constructor() { }

  public getDeliveryStatusColor(orderStatus: number) {
    switch (orderStatus) {

      case OrderStatus.CANCEL: {
        return 'cancel';
      }
      case OrderStatus.PROCESSING: {
        return 'processing';
      }
      case OrderStatus.PENDING: {
        return 'pending';
      }
      case OrderStatus.CONFIRM: {
        return 'confirm';
      }
      case OrderStatus.DELIVERED: {
        return 'delivered';
      }
      case OrderStatus.REFUND: {
        return 'refund';
      }
      case OrderStatus.SHIPPING: {
        return 'shipping';
      }
      default: {
        return 'none';
      }
    }
  }
}
