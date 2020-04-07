import { Injectable, Input } from '@angular/core';
const imageUrlBuilder = require('@sanity/image-url');
const sanityClientService = require('@sanity/client');
import { environment } from '../../environments/environment'

@Injectable()
export class SanityService {

  // sanityClientService: any;
  constructor(
  ) {
   }


  init() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      useCdn: environment.useCdn, // `false` if you want to ensure fresh data
    });
  }

  getImageUrlBuilder(sanityClientService: any) {
    return new imageUrlBuilder(sanityClientService);
  }

}
