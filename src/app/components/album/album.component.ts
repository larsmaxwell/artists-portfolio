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

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faBullseye, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() albumId: string;

  album: Album;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  activePaginationItems: [];
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
  maxDimensions: any;
  paginationCtrl: any;
  sanityInstance: any;
  sanityImgBuilder: any;


  constructor(
    private ArtWorkAlbumService: ArtWorkAlbumService,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    public router: Router,
    private library: FaIconLibrary,
    private meta: Meta,
    private title: Title,
    @Inject(WindowRefService) private window: Window,
    @Inject(PLATFORM_ID) private platformId
  ) {
    library.addIcons(this.faArrowLeft, this.faArrowRight, this.faChevronCircleLeft);
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

    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      if (this.route.firstChild && this.child !== this.route.firstChild) {
        if (this.subscription) { this.subscription.unsubscribe(); }
        this.child = this.route.firstChild;
        this.subscription = this.route.firstChild.url.subscribe(
          x => {
            this.setRouteParameterGlobalValues();

            this.getAlbumImages(this.getAlbumId); // Only need to do this once since images are loaded on load
          }
        );
      }
   });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setRouteParameterGlobalValues();

    this.getAlbumImages(this.getAlbumId);
  }

  ngAfterViewInit() {
    // this.resizeObservable$ = fromEvent(window, 'resize');
    // this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      // very costly
    // })
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

    if (this.route.firstChild && this.route.firstChild.snapshot.paramMap.get('imgId')) {
      this.imgIndex = parseInt(this.route.firstChild.snapshot.paramMap.get('imgId'));
    } 
    else if (this.route.snapshot.paramMap.get('imgId')) {
      this.imgIndex = parseInt(this.route.snapshot.paramMap.get('imgId'))
    }
    else {
      this.imgIndex = this.imgIndex | 0; // @input albumID
    }
    this.currPermalink = this.route.snapshot.paramMap.get('permalink');
  }

  getWindowHeight() {
    if (this.isBrowser) {
      return window.innerHeight;
    }
  }
  // General function for Updating most portions of the view when
  // the route changes
  updateSlideshowView() {
    this.setActivePaginationItems();

    this.updateImageControls();
  }

  goToSlide(imgIndex) {
    this.imgIndex = imgIndex;
    this.currentImg = this.images[this.imgIndex];

    this.updateSlideshowView();
    // Navigate the router to a new location
    if (this.homePage === false && this.imgIndex !== 0) {
      this.router.navigate([this.albumId, this.imgIndex], { relativeTo: this.route });
    }

  }

  updateIndexSlideAndRoute() {
    if (this.images && this.images.length > 0) {
      // Set the max width of all of the images
      this.maxDimensions = this.images[0].asset.metadata.dimensions;

      this.images.forEach(element => {
        console.log(element);
        if (element.asset.metadata.dimensions.width > this.maxDimensions.width) {
          this.maxDimensions = element.asset.metadata.dimensions;
        }
      });

      if (this.imgIndex <= this.images.length-1) {
        this.goToSlide(this.imgIndex);
      } else { // If there's a link to an index t dhat doesn't exist.
        this.imgIndex = 0;
        this.currentImg = this.images[0];

        this.goToSlide(0); // go to slide and update slideshow view
      }
    }
  }

  setActivePaginationItems() {
    // Get the number of Sets -- how many times can the max amt in a set 
    let numberSets = Math.ceil(this.images.length / this.maxPagination); // number of pagination menus to loop through + skip ahead
    let maxItem = numberSets * this.maxPagination;

    // Get the number of sets it would take to get to the closest
    // to the imgIndex
    // Img index
    let imgIndex = this.imgIndex;
    let pagDevIndex = imgIndex / this.maxPagination;
    let pagDevIndexFlr = Math.floor(pagDevIndex);
    
    let paginationStartIndex = pagDevIndexFlr > 0
        ? pagDevIndexFlr * this.maxPagination
        : 0;

    this.paginationCtrl = {
      paginationStartIndex: paginationStartIndex,
      isPrevDisabled: paginationStartIndex <= 0,
      isNextDisabled: paginationStartIndex >= maxItem - this.maxPagination,
      activePaginationItems: this.images.filter((image, index) => {
        console.log(paginationStartIndex);
        return index >= paginationStartIndex && index < paginationStartIndex + this.maxPagination;
      })
    }
  }

  getProperSlideWidth() {
    if (Math.ceil(this.maxDimensions.width / this.maxDimensions.height) > 1)  {
      return '80%';
    }
    else {
      return '60%';
    }
  }

  getAlbumImages(id) {

    const imgIDCopy =  this.imgIndex;

    this.ArtWorkAlbumService.getAlbumImages(this.sanityInstance, id).subscribe(data => {
      // console.log(this.images);
      this.images = data;
      let albumLength = this.images.length;

      this.updateIndexSlideAndRoute();

    });
  }

  updateImageControls() {
    if (this.images) {
      let desLength = this.images.length - 1;
      let imgInd = this.imgIndex;
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
    this.currentImg = this.images[this.imgIndex];
    // Update the controls available to the view
    this.updateImageControls();
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

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 576;
    }
  }

  isDeviceSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 768;
    }
  }
}
