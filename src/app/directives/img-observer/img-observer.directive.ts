import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { fromIntersectionObserver, IntersectionStatus } from './from-intersection-observer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appImgObserver]'
})
export class ImgObserverDirective {

  @Input() intersectionDebounce: number;
  @Input() intersectionRootMargin: string;
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() public visibilityChange: EventEmitter<any> = new EventEmitter<IntersectionStatus>();

  private destroy$ = new Subject();
  isBrowser: boolean;

  constructor(private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };
    if (this.isBrowser) {
      fromIntersectionObserver(
        element,
        config,
        this.intersectionDebounce
      ).pipe(
        takeUntil(this.destroy$)
      ).subscribe((status) => {
        this.visibilityChange.emit(status);
      });
    }

  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
