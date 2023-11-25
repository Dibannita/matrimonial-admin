import {Directive, Input} from '@angular/core';


@Directive({
  selector: '[checkImageDefault]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
  }
})
export class ImageLoadErrorDirective {


  @Input() src: string;
  public defaultImg: string = '/assets/images/placeholder/test.png';
  public onError() {
    this.src = this.defaultImg;
  }
  public checkPath(src) {
    return src ? src : this.defaultImg;
  }
}
