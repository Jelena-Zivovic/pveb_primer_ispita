import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImportance]'
})
export class ImportanceDirective {

  @Input() vaznost: number;


  constructor(private element: ElementRef) { }


  ngOnInit() {
    switch(this.vaznost) {
      case 1: {
        this.element.nativeElement.style.backgroundColor = "red";
        break;
      }
      case 2: {
        this.element.nativeElement.style.backgroundColor = "orange";
        break;
      }
      case 3: {
        this.element.nativeElement.style.backgroundColor = "yellow";
        break;
      }
    }
  }

}
