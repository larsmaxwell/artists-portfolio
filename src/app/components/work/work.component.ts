
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
import { Image } from '../../models/image.model';

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
  isLoading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    private albumSharedService: AlbumSharedService
  ) {
    this.hideGallery = false;
  }

  setMeta(metaInfo: {metaDescription: string, metaImage: string, metaKeywords: string, title: string}) {
    const {metaDescription, metaImage, metaKeywords, title} = metaInfo;
    this.title.setTitle( `Lauren (Lurn) Maxwell- ${title ? ':' + title : ''}` );
    this.meta.updateTag({property: 'og:title', content:  `Lauren (Lurn) Maxwell- ${title ? ':' + title : ''}` });
    this.meta.updateTag({name: 'keywords', content: metaKeywords? metaKeywords : ""  });
    this.meta.updateTag({property: 'og:description', content: metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:image', content: metaImage? metaImage: ''});
    this.meta.updateTag({property: 'og:image', content: metaImage? metaImage: ''});
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {

    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();

    this.route.params.subscribe(routeParams => {
      this.isLoading = true;

      this.title.setTitle( "Loading..." );


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

        this.setMeta({
          ...data.metaInfo,
          metaImage: data?.metaInfo?.metaImage? this.urlFor(data.metaInfo.metaImage.asset._ref) : '',
          title: data.name});

        this.albumSharedService.updateAlbumId(this.albumId);

        this.isLoading = false;
    });
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }
}
