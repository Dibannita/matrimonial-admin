import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {DefaultValueAccessor} from '@angular/forms';
import {UtilsService} from '../../services/core/utils.service';


@Directive({
  selector: '[autoSlug]',
  providers: []
})
export class AutoSlugDirective extends DefaultValueAccessor {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    private utilsService: UtilsService,
  ) {
    super(renderer, elementRef, false);
  }

  @HostListener('input', ['$event']) input($event: InputEvent) {
    const target = $event.target as HTMLInputElement;
    const start = target.selectionStart;

    target.value = this.utilsService.transformToSlug(target.value);
    target.setSelectionRange(start, start);

    this.onChange(target.value);
  }


}
