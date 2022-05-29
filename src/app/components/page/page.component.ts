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

    this.getPage(permalink);
  }

  setMeta(metaInfo: {metaDescription: string, metaImage: string, metaKeywords: string, title: string}) {
    const {metaDescription, metaImage, metaKeywords, title} = metaInfo;
    this.title.setTitle( `Lauren (Lurn) Maxwell- ${title ? 'Current Illustration:' + title : ''}` );
    this.meta.updateTag({property: 'og:title', content:  `Lauren (Lurn) Maxwell- ${title ? 'Current Illustration:' + title : ''}` });
    this.meta.updateTag({name: 'keywords', content: metaKeywords? metaKeywords : ""  });
    this.meta.updateTag({property: 'og:description', content: metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:image', content: metaImage? metaImage: ''});
    this.meta.updateTag({property: 'og:image', content: metaImage? metaImage: ''});
  }

  getPage(permalink: string) {
    let getPageData:Observable<Page> = this.sanityService.getPage(permalink);
    let getPageContentData: Observable<any>;

    getPageData.subscribe((data) => {
      const featuredImage = this.urlFor(data.featuredImage.asset._ref);

      this.page = data;

      this.setMeta({
        ...data.metaInfo,
        metaImage: featuredImage,
        title: data.name
      });
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
    return this.sanityService.getImageUrlBuilder().image(source)
  }

  getBlocks(source: string) {
    return blocksToHtml({
      blocks: source,
    });
  }

}
