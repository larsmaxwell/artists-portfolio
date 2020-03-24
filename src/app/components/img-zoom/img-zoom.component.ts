import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute} from '@angular/router';

import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  album: Album;
  currentImg: Object;
  imgControls: Object;
  desHeight: number;
  desWidth: number;
  sanityInstance: any;
  sanityImgBuilder: any;

  constructor(
    private ArtWorkAlbumService: ArtWorkAlbumService,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private router: RouterModule
  ) { }

  ngOnInit() {
    this.getSanity();
    this.getSanityUrlBuilder();
    const id = this.route.snapshot.paramMap.get('albumId');
    const imgId = this.route.snapshot.paramMap.get('imgId');

    this.getAlbum(id, imgId);
    this.desHeight = window.innerHeight;
    this.desWidth = window.innerWidth;

    this.route.params.subscribe(routeParams => {
      this.getAlbum(routeParams.albumId, routeParams.imgId);
    });
  }

  getAlbum(id: string, imgId: string) {
    const currPermalink = this.route.snapshot.paramMap.get('permalink');

    this.ArtWorkAlbumService.getAlbumById(id)
      .subscribe(album => {
        this.album = album;

        let albumArr = album.images;
        let albumLength = albumArr.length;

        console.log(album);

        this.currentImg = albumArr[imgId].asset._ref;
        let currentIndex = imgId;

        let desLength = albumLength - 1;
        let next = parseInt(currentIndex) === desLength ? 0 : parseInt(currentIndex) + 1;
        let prev = parseInt(currentIndex) === 0 ? desLength : parseInt(currentIndex) - 1;

        this.imgControls = {
            currentImg: albumArr[imgId],
            currentIndex: imgId,
            nextId: next,
            prevId: prev,
            permalink: currPermalink
        };
      });
  }

  getSanity() {
    this.sanityInstance = this.sanityService.init();
  }

  getSanityUrlBuilder() {
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder(this.sanityInstance);
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }

  getNextIndex(index: number) {
    if (index === this.album.images.length - 1) {
      return 0;
    }
    else {
      return index+1;
    }
  }

}
