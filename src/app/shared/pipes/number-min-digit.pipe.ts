import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numMinDigit',
  pure: true
})
export class NumberMinDigitPipe implements PipeTransform {

  transform(n: number, maxNum?: number): string {
    if (n < 10) {
      return '0' + n;
    } else if (n < 100) {
      return '' + n;
    } else {
      if (maxNum) {
        if (n < maxNum) {
          return '' + n;
        } else {
          return maxNum + '+'
        }
      } else {
        return n.toString()
      }
    }
  }

}
