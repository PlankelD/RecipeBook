import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
// it needs to inject the view container
// viewContainerRef gives me automatically access to the refernce, to a pointer at the place where this diretives is the used
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef){}
}
