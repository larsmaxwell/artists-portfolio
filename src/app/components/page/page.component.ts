import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';

import { SanityService } from "../../services/sanity.service";

import {Page} from "../../models/page.model";
import { environment } from '../../../environments/environment';

import * as blocksToHtml from '@sanity/block-content-to-html';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: Page;
  pageContentHtml: any;
  sanityInstance: any;
  sanityImgBuilder: any;
  blockContent: any;
  metaData: {title:string, description: string, keywords: string, featuredImage: any};
  featuredImage: any;

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService
  ) { }

  ngOnInit(): void {
    const permalink = this.route.snapshot.paramMap.get('permalink');

    this.title.setTitle( "Loading..." );
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder();

    this.getPage(permalink);
  }

  setMeta( newItems: {title:string, description: string, keywords: string, featuredImage: any}) {
    this.title.setTitle( 'Lauren (Lurn) Maxwell - ' + newItems.title );
    this.meta.updateTag({name: 'description', content: newItems.description});
    this.meta.updateTag({name: 'keywords', content: newItems.keywords});
    this.meta.updateTag({property: 'og:title', content: 'Lauren (Lurn) Maxwell - ' + newItems.title});
    this.meta.updateTag({property: 'og:description', content: newItems.description});
    this.meta.updateTag({name: 'twitter:description', content: newItems.description});
    this.meta.updateTag({property: 'og:image', content: newItems.featuredImage});
    this.meta.updateTag({name: 'image', content: newItems.featuredImage});
    this.meta.updateTag({name: 'twitter:image', content: newItems.featuredImage});
  }

  getPage(permalink: string) {
    let getPageData:Observable<Page> = this.sanityService.getPage(permalink);
    let getPageContentData: Observable<any>;

    getPageData.subscribe((data) => {
      const featuredImage = this.urlFor(data.featuredImage.asset._ref);

      this.page = data;
      this.metaData = {title: data.name, description: data.metaDescription, keywords: data.metaKeywords, featuredImage: featuredImage }
      this.setMeta(this.metaData);
    })

    getPageData
    .pipe(
      flatMap((pageData) => {
        if (pageData.pageContent.length > 0) {
          getPageContentData = this.sanityService.getPageBlockContents(pageData._id);
          return getPageContentData;
        }
        else {
          return EMPTY;
        }
      })
    )
    .subscribe((data) => {
      this.blockContent = data;
    });
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }

  getBlocks(source: string) {
    return blocksToHtml({
      blocks: source,
    });
  }

}
