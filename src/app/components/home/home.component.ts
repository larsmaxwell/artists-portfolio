import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes

// App Specific
import { Illustration } from '../../types/illustration';
import { IllustrationService } from '../../services/illustration.service';
import { SanityService } from '../../services/sanity.service';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  illustrations: any;
  illustrationsImages: any;
  sanityInstance: any;
  sanityImgBuilder: any;
  gridView: any;
  desHeight: any;
  desWidth: any;
  _masonry: Masonry;
  masonryItems: any[]; // NgMasonryGrid Grid item list
  isBrowser: boolean;
  activeSlide: string;
  imageID: string;
  slideshowView: any;
  imgControls: any = {};
  currentIndex: number;
  currentIll: any;

  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private illustrationService: IllustrationService,
    private location: Location,
    private library: FaIconLibrary,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    @Inject(PLATFORM_ID) private platformId
  ) { 
    library.addIcons(this.faArrowLeft);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.activeSlide = "";

    this.getSanity();
    this.getSanityUrlBuilder();

    this.imageID = this.route.snapshot.paramMap.get('imgId');
    this.slideshowView = !!this.route.snapshot.paramMap.get('imgId');

    this.setMeta();

    // Set element 
    this.setBrowserEffects();
    // Get illustrations
    this.getWorks();

    this.route.params.subscribe(routeParams => {
      console.log(routeParams);
      
      if (this.slideshowView) {
        this.setImgControls(routeParams.imgId);
      }
    });

    if (this.isBrowser) {
      let self = this;
      window.addEventListener('resize', function() {
        console.log(self);
        self.setBrowserEffects();
      });
    }

    // this.imgControls.

    // this.route.params.subscribe(routeParams => {
    //   this.getWorks();
    // });
  }

  onNgMasonryInit($event: Masonry) {

    console.log($event);
    this._masonry = $event;
  }

  getWorks(): void {
    const client = this.illustrationService.init();
    this.illustrationService.getAssetsClient(client)
      .subscribe((data) =>  { 
        this.illustrations = data;
        console.log(this.illustrations);
        if (this.slideshowView && !this.isMobileSize()) {
          this.setImgControls(this.imageID);
        }
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

  isActiveSlide(id:string) {
    return this.imageID === id;
  }

  setImgControls(imgId:any) {
    if (!this.illustrations) return;

    this.currentIndex = this.illustrations.findIndex((item) => {
      return item._id === imgId;
    });

    this.currentIll = this.illustrations.filter((item) => {
      return item._id === imgId;
    })[0];

    this.imageID = imgId;

    let next = this.currentIndex === this.illustrations.length-1 ? 0 : this.currentIndex + 1;
    let prev = this.currentIndex === 0 ? this.illustrations.length-1 : this.currentIndex - 1;

    this.imgControls.prevId = this.illustrations[prev]._id;
    this.imgControls.nextId = this.illustrations[next]._id;
  }

  setBrowserEffects() {
    if (this.isMobileSize() && this.isBrowser) {
      this.slideshowView = true
    }

    if (this.isBrowser) {
      this.desHeight = window.innerHeight + 'px';
      this.desWidth = window.innerWidth + 'px';
    }
  }

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 600;
    }
  }

  setMeta() {
    this.title.setTitle("Lurn Maxwell: Home");
    this.meta.updateTag({name: 'description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle"});
    this.meta.updateTag({name: 'keywords', content: "comics, horror comics, non binary, comix, zines, risograph comics, riso comics, horror comics, sci fi comics"});
    this.meta.updateTag({property: 'og:title', content: "Lurn Maxwell: About" });
    this.meta.updateTag({property: 'og:description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle" });
    this.meta.updateTag({name: 'twitter:description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle" });
    this.meta.updateTag({name: 'twitter:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
    this.meta.updateTag({property: 'og:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
  }
}
