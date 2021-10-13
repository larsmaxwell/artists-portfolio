import { from, fromEvent, Observable, Subscription } from 'rxjs';
import { max } from 'rxjs/operators';
import { Component, OnInit, Input, Inject, PLATFORM_ID, SimpleChanges, AfterViewChecked, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterEvent, ParamMap } from '@angular/router';

import { Image } from '../../models/image.model';

import { SanityService } from '../../services/sanity.service';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faBullseye, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
// import { IntersectionStatus } from '../../directives/from-intersection-observer';
// import { ImgObserverDirective } from '../../directives/img-observer.directive'

// Reusable image
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit, AfterViewInit, OnDestroy {

  // visibilityStatus: {[key: number]: IntersectionStatus} = {};
  // intersectionStatus = IntersectionStatus;
  resizeObservable$: Observable<any>;
  indexChange$: Observable<any>;
  resizeSubscription$: Subscription;
  @Input() images: any;
  @Input() routerLinkBase: string;
  @Input() currentImgIndex: number;
  @Input() pagination: boolean;
  @Input() maxPagination: number;
  @Input() illustrationIds: boolean;
  @Input() illustrations: any;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  paginationCtrl: any;
  isMobile: boolean;
  isBrowser: boolean;
  sanityInstance: any;
  sanityImgBuilder: any;
  maxDimensions: any;

  constructor(
    private sanityService: SanityService,
    private library: FaIconLibrary,
    public router: Router,
    public route: ActivatedRoute,
    private cdRef : ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
    this.route = route;

    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.indexChange$ = new Observable((observer) => {
        observer.next({isIntersecting: true});
        observer.complete();
      });
    });  
  }

  ngOnInit(): void {
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.images) this.images = changes.images.currentValue;

    this.setActivePaginationItems();
  }

  ngAfterViewInit() {
    this.isMobile = this.isMobileSize();

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.isMobile = this.isMobileSize();
    });

    this.cdRef.detectChanges();
  }

  enterKeyListener() {
    this.router.navigate([
      this.routerLinkBase, 
      this.images[this.currentImgIndex < this.images.length-1 ? this.currentImgIndex + 1 : 0].asset.assetId
    ]);
  }

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 576;
    }
  }

  getWindowWidth() {
    return window.innerWidth;
  }

  scaleImageHeight(assetData, imageWidth) {
    console.log(imageWidth * assetData.height);
    console.log(assetData.width);
    return (imageWidth * assetData.height) / assetData.width;
  }

  getWindowHeight() {
    if (this.isBrowser) {
      return window.innerHeight > 1200 ? 1200 : window.innerHeight;
    }
  }

  isCorrectIndex(id) {
    return parseInt(id) === this.currentImgIndex;
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }

  setActivePaginationItems() {
    // Return if this is being loaded without input initialization
    if (!this.images || this.images.length === 0 ) return;
    // Get the number of Sets -- how many times can the max amt in a set 
    let numberSets = Math.ceil(this.images.length / this.maxPagination); // number of pagination menus to loop through + skip ahead
    let maxItem = numberSets * this.maxPagination;

    // Get the number of sets it would take to get to the closest
    // to the currentImgIndex
    // Img index
    let currentImgIndex = this.currentImgIndex;
    let pagDevIndex = currentImgIndex / this.maxPagination;
    let pagDevIndexFlr = Math.floor(pagDevIndex);
    
    let paginationStartIndex = pagDevIndexFlr > 0
        ? pagDevIndexFlr * this.maxPagination
        : 0;

    this.paginationCtrl = {
      paginationStartIndex: paginationStartIndex,
      isPrevDisabled: paginationStartIndex <= 0,
      isNextDisabled: paginationStartIndex >= maxItem - this.maxPagination,
      activePaginationItems: this.images.filter((image, index) => {
        return index >= paginationStartIndex && index < paginationStartIndex + this.maxPagination;
      })
    }
  }

  getRouterLink(index:number) {
    if (this.illustrationIds) {
      index = this.images[index]._id || null;
    }
    return index;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
