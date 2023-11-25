import {Directive, HostListener} from '@angular/core';


@Directive({
  selector: '[nfNoSpaces]',
  providers: []
})
export class NoWhitespaceDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }
}
