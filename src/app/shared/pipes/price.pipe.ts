import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../interfaces/common/product.interface';
import {DiscountTypeEnum} from '../../enum/product.enum';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(product: Product, type: string, quantity?: number): number {

    if (product) {
      switch (type) {
        case 'salePrice': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            const disPrice = (product?.discountAmount / 100) * product?.salePrice;
            if (quantity) {
              return Math.floor((product?.salePrice - disPrice) * quantity);
            }
            return Math.floor(product?.salePrice - disPrice);
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return Math.floor((product?.salePrice - product.discountAmount) * quantity);
            }
            return Math.floor(product?.salePrice - product.discountAmount);
          } else {
            if (quantity) {
              return Math.floor((product?.salePrice) * quantity);
            }
            return Math.floor(product?.salePrice);
          }
        }
        case 'discountAmount': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return ((product?.discountAmount / 100) * product?.salePrice) * quantity;
            }
            return (product?.discountAmount / 100) * product?.salePrice;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return product?.discountAmount * quantity;
            }
            return product?.discountAmount;
          } else {
            return 0;
          }
        }
        case 'discountPercentage': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return product?.discountAmount;
            }
            return product?.discountAmount;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return Math.round((product?.discountAmount / product?.salePrice) * 100);
            }
            return Math.round((product?.discountAmount / product?.salePrice) * 100);
          } else {
            return 0;
          }
        }
        case 'regularPrice': {
          if (quantity) {
            return Math.floor(product?.salePrice * quantity);
          }
          return Math.floor(product?.salePrice);
        }
        default: {
          return product?.salePrice;
        }
      }
    } else {
      return 0;
    }

  }

}
