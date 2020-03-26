import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  @Input() imgRef: String;
  imgUrl: String;
  imgExt: String;
  origSize: String;
  constructor() { }

  ngOnInit() {
    this.returnImgUrl(this.imgRef);
  }

  returnImgUrl(imgRef: String) {
    var splitRef = imgRef.split("-");
    console.log(splitRef);
    this.imgUrl = splitRef[1];
    this.origSize = splitRef[2];
    this.imgExt = splitRef[3];
  }

}
