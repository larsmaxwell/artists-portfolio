import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, Inject, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';  
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Router, RouterModule, ActivatedRoute, NavigationEnd, RouterEvent, Event, ChildActivationEnd, ParamMap} from '@angular/router';

import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { SanityService } from '../../services/sanity.service';
import { WindowRefService } from '../../services/window-ref.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() albumId: string;

  album: Album;
  resizeObservable$: Observable<any>;
  resizeSubscription$: Subscription;
  activePaginationItems: [];
  isMobile: boolean;
  homePage: boolean;
  isBrowser: boolean;
  imgIndex: number;
  maxPagination: number;
  desHeight: string;
  currPermalink: string;
  getAlbumId: string;
  images: any;
  child: any;
  subscription: any;
  currentImg: any;
  imgControls: any;
  paginationCtrl: any;
  sanityInstance: any;
  sanityImgBuilder: any;


  constructor(
    private ArtWorkAlbumService: ArtWorkAlbumService,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    public router: Router,
    private meta: Meta,
    private title: Title,
    @Inject(WindowRefService) private window: Window,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.getSanity();
    this.getSanityUrlBuilder();

    this.maxPagination = 6;
  }

  ngOnInit() {

    const self = this;
    // Set global variables based on whats available in the root
    // this.setRouteParameterGlobalValues();

    // this.getAlbumImages(this.getAlbumId); // Only need to do this once since images are loaded on load
    // album images only need to be fetched when major changes happen


    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      if (this.route.firstChild && this.child !== this.route.firstChild) {
        if (this.subscription) { this.subscription.unsubscribe(); }
        this.child = this.route.firstChild;
        this.subscription = this.route.firstChild.url.subscribe(
          x => {
            this.setRouteParameterGlobalValues();
            this.updateIndexSlideAndRoute(); // Only need to do this once since images are loaded on load
          }
        );
      }
   });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setRouteParameterGlobalValues();

    this.getAlbumImages(this.albumId);
  }

  setRouteParameterGlobalValues() {
    // Homepage route params
    this.homePage = !this.route.firstChild; // opposite of child page

    if (this.homePage) {
      this.imgIndex=0;
    }

    // Get information about the album and Img ID on the page
    // if (this.route.firstChild && this.route.firstChild.snapshot.paramMap.get('albumId')) {
    //   this.getAlbumId = this.route.firstChild.snapshot.paramMap.get('albumId');
    // } 
    // else if (this.route.snapshot.paramMap.get('albumId')) {
    //   this.getAlbumId = this.route.snapshot.paramMap.get('albumId');
    // }
    // else {
      this.getAlbumId = this.albumId; // @input albumID
    // }

    this.currPermalink = this.route.snapshot.paramMap.get('permalink');
  }

  // General function for Updating most portions of the view when
  // the route changes
  // updateSlideshowView() {
  //   this.setActivePaginationItems();
  // }

  updateIndexSlideAndRoute() {

    this.imgIndex = this.route.firstChild ? this.images.findIndex((item) => {
      return item.asset.assetId === this.route.firstChild.snapshot.paramMap.get('imgId');
    }) : 0;

    this.currentImg = this.images[this.imgIndex];

    if (this.images && this.images.length > 0) {
      if (this.imgIndex <= this.images.length-1) {
        this.currentImg = this.images[this.imgIndex];
      } else { // If there's a link to an index t dhat doesn't exist.
        this.imgIndex = 0;
        this.currentImg = this.images[0];
      }
    }
  }

  getAlbumImages(id) {

    const imgIDCopy =  this.imgIndex;

    this.ArtWorkAlbumService.getAlbumImages(this.sanityInstance, id).subscribe(data => {
      // console.log(this.images);
      this.images = data;

      this.updateIndexSlideAndRoute();
    });
  }

  isCorrectIndex(id) {
    return parseInt(id) === this.imgIndex;
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
