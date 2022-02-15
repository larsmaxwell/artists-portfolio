import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
// import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes

// App Specific
import { Illustration } from '../../models/illustration.model';
import { SanityService } from '../../services/sanity.service';
import { Subscription } from 'rxjs';

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
  isBrowser: boolean;
  imageID: string;
  slideshowView: any;
  imgControls: any = {};
  currentIndex: number;
  currentIll: any;
  routeSubscription: Subscription;
  isHome:boolean;

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    @Inject(PLATFORM_ID) private platformId
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();
 
    this.imageID = this.route.snapshot.paramMap.get('imgId');
    this.slideshowView = !!this.route.snapshot.paramMap.get('imgId') || this.isMobileSize();

    // Get illustrations
    this.route.data.subscribe((data: Data) => {
      this.isHome = data.home;

      this.illustrations = data.illustrations;

      this.images = this.illustrations.map(illustration => illustration.featuredImage);

      if (!this.imageID) {
        this.imageID = this.images[0].asset.assetId;
      }
      this.setImgControls(this.imageID);
    });

    this.route.params.subscribe(routeParams => {
      if (routeParams.imgId) {
        this.setImgControls(routeParams.imgId);
      }
    });

  }

  isActiveSlide(id:string) {
    return this.imageID === id;
  }

  setImgControls(imgId:string) {
    if (!this.images) return;

    this.imageID = imgId;
    this.currentIndex = imgId ? this.images.findIndex((item) => {
      return item.asset.assetId === imgId;
    }) : 0;

    this.currentIll = this.illustrations[this.currentIndex];

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
