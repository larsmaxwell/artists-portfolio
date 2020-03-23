import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import { Album } from '../../types/album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { Work } from '../../types/work';
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
  }

  getAlbum(id: string, imgId: string) {
    const currPermalink = this.route.snapshot.paramMap.get('permalink');

    this.ArtWorkAlbumService.getAlbumById(id)
      .subscribe(album => {
        this.album = album;

        let albumArr = album.images;
        let albumLength = albumArr.length;

        console.log(album);

        // album.images[0].asset._ref

        this.currentImg = albumArr[imgId].asset._ref;
        let currentIndex = imgId;
        // this.featuredImg = albumArr.filter(img => img.id === imgId)[0];
        // let currImgIndex = albumArr.findIndex(img => img.id === imgId);

        let desLength = albumLength - 1;
        let next = parseInt(currentIndex) === desLength ? 0 : parseInt(currentIndex) + 1;
        let prev = parseInt(currentIndex) === 0 ? desLength : parseInt(currentIndex) - 1;

        let nextRef = albumArr[next].asset._ref;
        let prevRef = albumArr[prev].asset._ref;

        this.imgControls = {
            currentImg: albumArr[imgId],
            nextId: next,
            prevId: prev,
            permalink: currPermalink
        };
      });
  }

  goToNext(permalink: string, albumId: string, nextIndex: number) {
    (<any>this.router).navigate([`/works/${permalink}/${albumId}/${nextIndex}`]);
  }

  goToPrev(permalink: string, albumId: string, prevIndex: number) {
    (<any>this.router).navigate([`/works/${permalink}/${albumId}/${prevIndex}`]);
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

}
