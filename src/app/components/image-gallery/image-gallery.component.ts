import { fromEvent, Observable, Subscription } from 'rxjs';
import { max } from 'rxjs/operators';

import { Component, OnInit, Input, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';  
import { SanityService } from '../../services/sanity.service';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faBullseye, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';

// Reusable image
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  resizeObservable$: Observable<any>;
  resizeSubscription$: Subscription;
  @Input() images: any;
  @Input() currentImg: string;
  @Input() routerLinkBase: string;
  @Input() currentImgIndex: number;
  @Input() pagination: boolean;
  @Input() maxPagination: number;
  @Input() illustrationIds: boolean;
  @Input() homePage: boolean
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
    @Inject(PLATFORM_ID) private platformId
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);

    library.addIcons(this.faArrowLeft, this.faArrowRight);


    this.getSanity();
    this.getSanityUrlBuilder();
  }

  ngOnInit(): void {
 
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setActivePaginationItems();
  }

  ngAfterViewInit() {
    this.isMobile = this.isMobileSize();

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.isMobile = this.isMobileSize();
    });
  }

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 576;
    }
  }

  getWindowHeight() {
    if (this.isBrowser) {
      return window.innerHeight > 1200 ? 1200 : window.innerHeight;
    }
  }

  isCorrectIndex(id) {
    return parseInt(id) === this.currentImgIndex;
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

    // // Set the max width of all of the images
    // this.maxDimensions = this.images[0].asset.metadata.dimensions;

    // // this.maxDimensions = this.images.pipe( max<any>((a: any, b: any) => a.asset.metadata.dimensions.width < b.asset.metadata.dimensions.width ? -1 : 1));
    // this.images.forEach(element => {
    //   console.log(element);
    //   if (element.asset.metadata.dimensions.width > this.maxDimensions.width) {
    //     this.maxDimensions = element.asset.metadata.dimensions;
    //   }
    // });


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


  getRouterLink(index:number) {
    if (this.illustrationIds) {
      index = this.images[index]._id || null;
    }
    return index;
  }
}
