import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';

import { SanityService } from "../../services/sanity.service";

import {Page} from "../../models/page.model";
import { environment } from '../../../environments/environment';

import * as blocksToHtml from '@sanity/block-content-to-html';

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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService
  ) { }

  ngOnInit(): void {
    const permalink = this.route.snapshot.paramMap.get('permatwo');

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
    this.sanityService.getPage(permalink).subscribe(
      data => {
        var metaData;
        this.page = data;

        if (data.pageContent) {
          this.sanityService.getPageImages(data._id).subscribe(
            data => {
              this.blockContent = data;
            }
          );
        }
        var featuredImage = this.urlFor(data.featuredImage.asset._ref);
        metaData = {title: data.name, description: data.metaDescription, keywords: data.metaKeywords, featuredImage: featuredImage }
        this.setMeta(metaData);
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
