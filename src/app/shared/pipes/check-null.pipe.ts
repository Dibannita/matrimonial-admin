import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'checkNull',
  pure: true
})
export class CheckNullPipe implements PipeTransform {

  transform(text: any, nullTxt?: string): any {

    if (text) {
      return text;
    } else {
      return nullTxt ? nullTxt : 'N/A';
    }

  }

}
