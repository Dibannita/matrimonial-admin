import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'slugToNormal',
  pure: true
})
export class SlugToNormalPipe implements PipeTransform {

  transform(slug: string, separator?: string): string {
    if (slug) {
      let words;
      if (separator) {
        words = slug.split(separator);
      } else {
        words = slug.split('-');
      }
      return words.map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');
    } else {
      return '';
    }

  }

}
