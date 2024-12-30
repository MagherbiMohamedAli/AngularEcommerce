import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appSaleHighlight]',
})
export class SaleHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input('appSaleHighlight') set sale(value: boolean) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffe6e6');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }

}
