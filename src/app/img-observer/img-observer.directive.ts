import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, NgModule, HostBinding } from '@angular/core';
import { fromIntersectionObserver, IntersectionStatus } from './from-intersection-observer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Directive({
  selector: 'img[appImgObserver]'
})
export class ImgObserverDirective {

  @Input() intersectionDebounce: number;
  @Input() intersectionRootMargin: string;
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() public visibilityChange: EventEmitter<any> = new EventEmitter<IntersectionStatus>();

  private destroy$ = new Subject();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      console.log(status);
      if (status === "Visible") {
        this.element.nativeElement.src = this.element.nativeElement.dataset.src;
      }
      this.visibilityChange.emit(status);
    });  
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
