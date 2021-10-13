import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})
export class GalleryImageComponent implements OnInit {
  @Input() image: string;
  @Input() lazyLoadImg: string;
  @Input() windowWidth: number;
  @Input() caption: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
