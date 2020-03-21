import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Album } from '../../types/album';
import { AlbumService } from '../../services/album.service';
import { Work } from '../../types/work';

@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  album: Album;
  featuredImg: Object;
  imgControls: Object;
  desHeight: number;
  desWidth: number;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('albumId'));
    const imgId = parseInt(this.route.snapshot.paramMap.get('imgId'));

    this.getAlbum(id, imgId);
    this.desHeight = window.innerHeight;
    this.desWidth = window.innerWidth;
  }

  getAlbum(id: number, imgId: number) {
    const currPermalink = this.route.snapshot.paramMap.get('permalink');

    this.albumService.getAlbum(id)
      .subscribe(album => {
        this.album = album;

        let albumArr = album.images;
        let albumLength = albumArr.length;

        this.featuredImg = albumArr.filter(img => img.id === imgId)[0];
        let currImgIndex = albumArr.findIndex(img => img.id === imgId);

        let desLength = albumLength - 1;
        let next = currImgIndex === desLength ? 0 : currImgIndex + 1;
        let prev = currImgIndex === 0 ? desLength : currImgIndex - 1;

        let nextId = albumArr[next].id;
        let prevId = albumArr[prev].id;

        this.imgControls = {
            nextId: nextId,
            prevId: prevId,
            permalink: currPermalink
        };
      });
  }

  calculateWidth() {
    console.log(this);
  }

  showNext(id, imgId) {
    this.getAlbum(id, imgId);
  }

  showPrev(id, imgId) {
    this.getAlbum(id, imgId);
  }

}
