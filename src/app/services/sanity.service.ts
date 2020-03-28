import { Injectable, Input } from '@angular/core';
const imageUrlBuilder = require('@sanity/image-url');
const sanityClientService = require('@sanity/client');

@Injectable()
export class SanityService {

  // sanityClientService: any;
  constructor(
  ) {
   }


  init() {
    return new sanityClientService({
      projectId: 'qwmluuy0',
      dataset: 'production',
      useCdn: false, // `false` if you want to ensure fresh data
      ignoreBrowserTokenWarning: true
    });
  }

  getImageUrlBuilder(sanityClientService: any) {
    return new imageUrlBuilder(sanityClientService);
  }

}
