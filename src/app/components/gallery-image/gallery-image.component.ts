import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})
export class GalleryImageComponent implements OnInit {
  @Input() image: string;
  @Input() lazyLoadImg: string;
  @Input() caption: string;

  srcAttr:string = '';
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.srcAttr = this.image;
    }
    else {
      this.srcAttr = this.lazyLoadImg;
    }
  }

  onVisibilityChange(visibilityStatus) {
    if (this.isBrowser) {
      if (visibilityStatus === "Visible") {
        this.srcAttr = this.lazyLoadImg;
      }
    }
  }
}
