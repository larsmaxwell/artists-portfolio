import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
// import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes

// App Specific
import { Illustration } from '../../models/illustration.model';
import { SanityService } from '../../services/sanity.service';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  illustrations: any;
  images:any = [];

  illustrationsImages: any;
  sanityInstance: any;
  sanityImgBuilder: any;
  gridView: any;
  desHeight: any;
  desWidth: any;
  // _masonry: Masonry;
  // masonryItems: any[]; // NgMasonryGrid Grid item list
  isBrowser: boolean;
  activeSlide: string;
  imageID: string;
  slideshowView: any;
  imgControls: any = {};
  currentIndex: number;
  currentIll: any;

  faArrowLeft = faArrowLeft;
  isHome:boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private library: FaIconLibrary,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    @Inject(PLATFORM_ID) private platformId
  ) { 
    // this.library.addIcons(this.faArrowLeft);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.activeSlide = "";

    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();
 
    this.imageID = this.route.snapshot.paramMap.get('imgId');
    this.slideshowView = !!this.route.snapshot.paramMap.get('imgId') || this.isMobileSize;


    // Set element 
    // Get illustrations
    this.getWorks();

    this.route.params.subscribe(routeParams => {
      if (!routeParams.imgId) {
        this.isHome = true;
      }
      else {
        this.isHome = false;
      }
      this.setImgControls(routeParams.imgId);
    });

  }

  getWorks(): void {
    this.sanityService.getIllustrationAssets()
    .subscribe((data) =>  {

      this.illustrations = data;
      this.illustrations.forEach(element => {
        this.images.push(element.featuredImage);
      });
      if (!this.imageID) {
        this.imageID = this.images[0].asset.assetId;
      }

      this.setImgControls(this.imageID);
    });
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
      return item.featuredImage.asset.assetId === imgId;
    }) || 0;

    this.currentIll = this.illustrations[this.currentIndex];
    this.imageID = imgId;

    if (!this.isHome) {
      const meta = { description: this.currentIll.description, name: this.currentIll.name, image: this.currentIll.featuredImage.asset.url };
      this.setMeta(meta);
    }
  }

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 600;
    }
  }

  setMeta(data) {
    this.title.setTitle("Lauren (Lurn) Maxwell- Current Illustration: " + data.name);
    this.meta.updateTag({name: 'description', content: data.name + " (" + data.description + ")"});
    this.meta.updateTag({name: 'keywords', content: "comics, horror comics, illustration, non binary, comix, zines, risograph comics, riso comics, horror comics, sci fi comics"});
    this.meta.updateTag({property: 'og:title', content: "Lauren (Lurn) Maxwell- Current Illustration: " + data.name });
    this.meta.updateTag({property: 'og:description', content:  data.name + " (" + data.description + ")" });
    this.meta.updateTag({name: 'twitter:description', content: data.name + " (" + data.description + ")" });
    this.meta.updateTag({name: 'twitter:image', content: data.image });
    this.meta.updateTag({property: 'og:image', content: data.image });
  }
}
