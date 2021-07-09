
// Angular
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Subscriber, Observable } from 'rxjs';

import * as blocksToHtml from '@sanity/block-content-to-html';

// App Specific
import { ArtWork } from '../../types/art-work';
import { ArtWorkService } from '../../services/art-work-service.service';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { SanityService } from '../../services/sanity.service';

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
  albumId: string;
  safeURL: SafeResourceUrl;
  descriptionHtmlBlock: String; 
  sanityInstance: any;
  sanityImgBuilder: any;
  hideGallery: boolean;

  constructor(
    private route: ActivatedRoute,
    private artWorkService: ArtWorkService,
    private albumService: ArtWorkAlbumService,
    private location: Location,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService
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

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);

    this.title.setTitle( "Loading..." );
    this.getSanity();
    this.getSanityUrlBuilder();

    this.route.params.subscribe(routeParams => {
      this.getArtWorkByPermalink(routeParams.permalink);
    });

  }
  
  // onVisibilityChanged(index: number, status: IntersectionStatus) {
  //   this.visibilityStatus[index] = status;
  // }


  ngOnChanges(changes: SimpleChanges) {
    // const permalink = this.route.snapshot.paramMap.get('permalink');
    //this.getArtWorkByPermalink(this.route.snapshot.paramMap.get('permalink'));
  }

  getArtWorkByPermalink(permalink: string) {
    const client = this.artWorkService.init();

    this.artWorkService.getWorkByPermalink(permalink).subscribe(
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
}
