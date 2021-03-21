import { Component, OnInit, Input, Inject, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';  
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Router, RouterModule, ActivatedRoute, ParamMap} from '@angular/router';

import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { SanityService } from '../../services/sanity.service';
import { WindowRefService } from '../../services/window-ref.service';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  @Input() albumId: string;

  album: Album;
  images: any;
  currentImg: any;
  imgControls: any;
  imgIndex: number;
  desHeight: string;
  desWidth: string;
  sanityInstance: any;
  sanityImgBuilder: any;
  slideshow: boolean;
  currPermalink: string;
  isBrowser: boolean;
  getAlbumId: string;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;


  constructor(
    private ArtWorkAlbumService: ArtWorkAlbumService,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private router: Router,
    private library: FaIconLibrary,
    private meta: Meta,
    private title: Title,
    @Inject(WindowRefService) private window: Window,
    @Inject(PLATFORM_ID) private platformId
  ) {
    library.addIcons(this.faArrowLeft, this.faArrowRight, this.faChevronCircleLeft);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getSanity();
    this.getSanityUrlBuilder();
    const currentRoute = this.route ? this.route : this.route;
    const snapshotCapture = currentRoute ? currentRoute.snapshot : currentRoute.snapshot;

    // Get information about the album
    this.getAlbumId = this.albumId || this.route.snapshot.paramMap.get('albumId');
    this.getAlbum(this.getAlbumId);

    this.imgIndex = parseInt(this.route.snapshot.paramMap.get('imgId')) || 0;
    this.currPermalink = this.route.snapshot.paramMap.get('permalink');

    if (this.imgIndex && this.currPermalink) {
      this.slideshow = true;
    }

    this.getAlbumImages(this.getAlbumId);

    this.route.params.subscribe(params => {
      this.getAlbumId = params.albumId ? params.albumId : this.albumId;
      this.imgIndex = params.imgId ? parseInt(params.imgId) : 0;
      this.getAlbumImages(this.getAlbumId);
    });

  }
  ngOnChanges(changes: SimpleChanges) {
    
    this.getAlbumId = this.route.snapshot.paramMap.get('albumId') ? this.route.snapshot.paramMap.get('albumId') : this.albumId;
    this.imgIndex = this.route.snapshot.paramMap.get('imgId') ? parseInt(this.route.snapshot.paramMap.get('imgId')) : 0;

    this.getAlbumImages(this.getAlbumId);
  }

  getWindowHeight() {
    if (this.isBrowser) {
      return window.innerHeight;
    }
  }

  getAlbumImages(id) {
    this.ArtWorkAlbumService.getAlbumImages(this.sanityInstance, id).subscribe(data => {
      // console.log(this.images);
      this.images = data;
      let albumLength = this.images.length;

      this.updateCurrentImage(data[this.imgIndex]);

      this.updateImageControls();
    });
  }

  updateCurrentImage(image) {
    this.currentImg = image;
  }

  updateImageControls() {
    let desLength = this.images.length - 1;
    let imgInd = this.imgIndex
    let next = imgInd === desLength ? 0 : imgInd + 1;
    let prev = imgInd === 0 ? desLength : imgInd - 1;

    this.imgControls = {
        currentImg: this.currentImg,
        currentIndex: imgInd,
        nextId: next,
        prevId: prev,
        permalink: this.currPermalink
    };
  }

  updateRouter(forward:boolean) {
    forward: forward || false;
    if (forward === true) {
      this.router.navigate([this.albumId, this.imgControls.nextId], { relativeTo: this.route });
      this.imgIndex = parseInt(this.imgControls.nextId);
    } else {
      this.router.navigate([this.albumId, this.imgControls.prevId], { relativeTo: this.route });
      this.imgIndex = parseInt(this.imgControls.prevId);
    }

    // Set the asset for the index
    this.updateCurrentImage(this.images[this.imgIndex].asset);
    // Update the controls available to the view
    this.updateImageControls();
  }

  isCorrectIndex(id) {
    return parseInt(id) === this.imgIndex;
  }

  getAlbum(id: string) {

    // const currPermalink = this.route.firstChild.snapshot.paramMap.get('permalink');

    this.ArtWorkAlbumService.getAlbumById(id)
      .subscribe(album => {
        this.album = album;
        console.log(album);
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

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 768;
    }
  }

}
