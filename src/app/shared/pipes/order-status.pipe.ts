import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../../enum/order.enum';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(status: number, type?: string): unknown {

    switch (status) {
      case OrderStatus.PENDING : {
        return 'Pending';
      }
      case OrderStatus.CONFIRM : { 
        return 'Confirm';
      }
      case OrderStatus.PROCESSING : {
        return 'Processing';
      }
      case OrderStatus.SHIPPING : {
        return 'Shipping';
      }
      case OrderStatus.DELIVERED : {
        return 'Delivered';
      }
      case OrderStatus.CANCEL : {
        return 'Cancel';
      }
      case OrderStatus.REFUND : {
        return 'Refund';
      }
      case OrderStatus.NONE : {
        return 'None';
      }
      default: {
        return '-';
      }
    }

  }

  reverse(status: string, type?: string): unknown {

    switch (status) {
      case 'Pending' : {
        return OrderStatus.PENDING;
      }
      case 'Confirm' : {
        return OrderStatus.CONFIRM;
      }
      case 'Processing' : {
        return OrderStatus.PROCESSING;
      }
      case 'Shipping'  : {
        return OrderStatus.SHIPPING;
      }
      case 'Delivered' : {
        return OrderStatus.DELIVERED;
      }
      case 'Cancel' : {
        return OrderStatus.CANCEL;
      }
      case 'Refund' : {
        return OrderStatus.REFUND;
      }
      case 'None' : {
        return OrderStatus.NONE;
      }
      default: {
        return '-';
      }
    }

  }

}
