import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appOutSideClick]'
})
export class OutSideClickDirective {

  @Output()
  outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  @Output()
  insideClick: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    } else  {
      this.insideClick.emit(event);
    }
  }

  constructor(private elementRef: ElementRef) {}

}
