import { Injectable, Input } from '@angular/core';
const sanityClientService = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

@Injectable()
export class SanityService {

  sanityClientService: any;
  constructor(
  ) {
   }


  init() {
    return new sanityClientService({
      projectId: 'qwmluuy0',
      dataset: 'production',
      token: 'skzltzX7McG8z1GrWtT0ePjvR4kiVh4GK0dqykTApp0KPbJEYwOdZMPaLBobEjEpjZitYf7ZAiBvyDuw6LH5nxZNXLYCXcSKMwWxXPunvc78SEaVmiwREBm2UYXS2iBhz0AgBV6dQEASwJmwXIKo1O5qwcWoP4zSyNvbnx4mUmQqT9q3cHb9', // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });
  }

  getImageUrlBuilder(sanityClientService: any) {
    return new imageUrlBuilder(sanityClientService);
  }

}
