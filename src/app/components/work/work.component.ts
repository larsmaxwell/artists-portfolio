
// Angular
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Subscriber, Observable } from 'rxjs';

import * as blocksToHtml from '@sanity/block-content-to-html';

// App Specific
import { ArtWork } from '../../models/art-work.model';
import { SanityService } from '../../services/sanity.service';
import { AlbumSharedService } from '../../services/album-shared.service';

//  Directiives
// import { ImgObserverDirective } from '../../directives/img-observer.directive'
// import { IntersectionStatus } from '../../directives/from-intersection-observer';

@Component({
  selector: 'app-art-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit {
  // visibilityStatus: {[key: number]: IntersectionStatus} = {};
  // intersectionStatus = IntersectionStatus;

  work: ArtWork;
  images: any[];
  albumId: string;
  safeURL: SafeResourceUrl;
  descriptionHtmlBlock: String; 
  sanityInstance: any;
  sanityImgBuilder: any;
  hideGallery: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    private albumShared: AlbumSharedService
  ) {
    this.hideGallery = false;
  }

  setMeta( newItems: {title:string, description: string, keywords: string, featuredImage: any}) {
    this.title.setTitle( newItems.title );
    this.meta.updateTag({name: 'description', content: newItems.description});
    this.meta.updateTag({name: 'keywords', content: newItems.keywords});
    this.meta.updateTag({property: 'og:title', content: newItems.title});
    this.meta.updateTag({property: 'og:description', content: newItems.description});
    this.meta.updateTag({name: 'twitter:description', content: newItems.description});
    this.meta.updateTag({name: 'twitter:image', content: newItems.featuredImage});
    this.meta.updateTag({property: 'og:image', content: newItems.featuredImage});
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);

    this.title.setTitle( "Loading..." );
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();

    this.route.params.subscribe(routeParams => {
      this.getArtWorkByPermalink(routeParams.permalink);
    });
  }

  getArtWorkByPermalink(permalink: string) {
    this.sanityService.getWorkByPermalink(permalink).subscribe(
      data => {
        var metaData;
        this.work = data;

        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(data.mediaUrl);

        if (data.album) {
          this.albumId = data.album._ref;
        }
        else {
          this.albumId = null;
        }

        if (data.description) {
          this.descriptionHtmlBlock = blocksToHtml({
            blocks: data.description,
          });
        }

        metaData = {title: data.name, description: data.metaDescription, keywords: data.keywords, featuredImage: this.urlFor(data.featuredImage.asset._ref) }
        this.setMeta(metaData);

        this.albumShared.updateAlbumId(this.albumId);
    });
  }

  getAlbumImages(albumId) {

    this.sanityService.getAlbumImages(albumId).subscribe(data => {
      // console.log(this.images);
      this.images = data;

    });

  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }
}
