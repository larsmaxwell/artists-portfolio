import { Injectable } from '@angular/core';
const sanityClientService = require('@sanity/client');


@Injectable()
export class SanityCategoryService {

  constructor()
  {
  }

  init() {
    return new sanityClientService({
      projectId: 'qwmluuy0',
      dataset: 'production',
      token: 'skzltzX7McG8z1GrWtT0ePjvR4kiVh4GK0dqykTApp0KPbJEYwOdZMPaLBobEjEpjZitYf7ZAiBvyDuw6LH5nxZNXLYCXcSKMwWxXPunvc78SEaVmiwREBm2UYXS2iBhz0AgBV6dQEASwJmwXIKo1O5qwcWoP4zSyNvbnx4mUmQqT9q3cHb9', // or leave blank to be anonymous user
      useCdn: false // `false` if you want to ensure fresh data
    });
  }

  getCategories(client: any) {
    const query = '*[_type == "category"]'

    return client.fetch(query);
  }

}
