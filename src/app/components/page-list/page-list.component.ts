import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';

import { SanityService } from "../../services/sanity.service";

import {Page} from "../../models/page.model";
import { environment } from '../../../environments/environment';

import * as blocksToHtml from '@sanity/block-content-to-html';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  pages: any;
  sanityInstance: any;

  constructor(
    // private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService
  ) { }

  ngOnInit(): void {

    this.sanityService.getPages().subscribe(
    data => {
      this.pages = data;
    });
  }

  setMeta( newItems: {title:string, description: string, keywords: string, featuredImage: any}) {
    this.title.setTitle( newItems.title );
    this.meta.updateTag({name: 'description', content: newItems.description});
    this.meta.updateTag({name: 'keywords', content: newItems.keywords});
    this.meta.updateTag({property: 'og:title', content: newItems.title});
    this.meta.updateTag({property: 'og:description', content: newItems.description});
    this.meta.updateTag({name: 'twitter:description', content: newItems.description});
  }
}
