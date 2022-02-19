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
export class ImageGalleryComponent implements OnInit, OnDestroy {

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

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  paginationCtrl: any;
  isMobile: boolean;
  isBrowser: boolean;
  sanityInstance: any;
  sanityImgBuilder: any;

  imageDimensions = {
    mobileUp: {
      width: 700
    },
    tabletUp: {
      width: 1200
    }
  }

  maxDimensions = {
    mobile: {
      width: 575
    },
    tabletUp: {
      width: 1200
    }
  }

  constructor(
    private sanityService: SanityService,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();

    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.indexChange$ = new Observable((observer) => {
        observer.next({isIntersecting: true});
        observer.complete();
      });
    });

    // why was this inside of afterViewInit?
    if (this.isBrowser) {
      this.isMobile = this.isMobileSize();

      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
        this.isMobile = this.isMobileSize();
      });

      // this.cdRef.detectChanges();
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.setActivePaginationItems();
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
    if (this.isBrowser) {
      return window.innerWidth;
    }
  }

  scaleImageHeight(assetData, imageWidth) {
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
      return this.images[index].asset.assetId || null;
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) this.resizeSubscription$.unsubscribe();
  }
}
