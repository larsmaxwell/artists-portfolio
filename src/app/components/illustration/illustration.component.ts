import { Component, OnInit, Input, Inject, ViewChild, OnChanges, Renderer2, PLATFORM_ID, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';
import { SanityService } from '../../services/sanity.service';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  @Input() illustration: any;

  sanityInstance: any;
  sanityImgBuilder: any;

  el: HTMLElement;

  constructor(
    private meta: Meta,
    private title: Title,
    private sanityService: SanityService,
    el: ElementRef,
    public renderer: Renderer2
  ) { 

  }

  ngOnInit(): void {
    this.getSanity();
    this.getSanityUrlBuilder();

    console.log(this.illustration);
  }

  mapWidthToHeight(width, height) {
    return (height * 240) / width;
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
