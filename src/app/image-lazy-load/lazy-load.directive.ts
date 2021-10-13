import { AfterViewInit, Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr = null;
  @Input() lazyLoad: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) {
  }

  ngAfterViewInit() {
    // this.el.nativeElement.classList.add('lazy-load-pre-loading')
    // this.el.nativeElement.style.backgroundColor = "#ccc";


    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          // this.el.nativeElement.classList.remove('lazy-load-pre-loading')
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.el.nativeElement.dataset.src;
  }

}
