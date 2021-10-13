import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})
export class GalleryImageComponent implements OnInit {
  @Input() image: string;
  @Input() lazyLoadImg: string;
  @Input() windowWidth: number;
  @Input() scaledHeight: number;
  @Input() caption: string;

  srcAttr:string = '';

  constructor() { }

  ngOnInit(): void {
    this.srcAttr = this.image;
  }

  onVisibilityChange(visibilityStatus) {
    if (visibilityStatus === "Visible") {
      this.srcAttr = this.lazyLoadImg;
    }
  }
}
