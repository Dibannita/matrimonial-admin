import {Pipe, PipeTransform} from '@angular/core';
import {ProductVariationOption, VariationOption} from '../../interfaces/common/variation.interface';

@Pipe({
  name: 'variationNormalize',
  pure: true
})
export class VariationNormalizePipe implements PipeTransform {

  transform(variationOption: ProductVariationOption[], option?: string): any {
    if (variationOption) {
      return variationOption.map(m => {
        return `${m.name} : ${m.value} `
      }).join(', ')
    } else {
      return 'N/A';
    }

  }

}
