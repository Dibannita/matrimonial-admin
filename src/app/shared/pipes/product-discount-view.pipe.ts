import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../interfaces/common/product.interface';
import {DiscountTypeEnum} from '../../enum/product.enum';

@Pipe({
  name: 'productDiscount'
})
export class ProductDiscountViewPipe implements PipeTransform {

  transform(product: Product, type: string): string {

    if (product) {
      switch (type) {
        case 'default': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            return `${product.discountAmount}%`;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            return `${product.discountAmount}Tk`;
          } else {
            return 'N/A'
          }
        }
        default: {
          return 'N/A'
        }
      }
    } else {
      return 'N/A'
    }

  }

}
