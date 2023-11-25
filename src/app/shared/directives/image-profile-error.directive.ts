import {Directive, Input} from '@angular/core';


@Directive({
  selector: '[checkImageProfile]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
  }
})
export class ImageProfileErrorDirective {


  @Input() src: string;
  public defaultImg: string = '/assets/images/avatar/user_low.png';
  public onError() {
    this.src = this.defaultImg;
  }
  public checkPath(src) {
    return src ? src : this.defaultImg;
  }
}
