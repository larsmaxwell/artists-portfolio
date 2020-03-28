import { Injectable } from '@angular/core';
const sanityClientService = require('@sanity/client');
import { environment } from '../../environments/environment';


@Injectable()
export class SanityCategoryService {

  constructor()
  {
  }

  init() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      // token: environment.token,
      useCdn: environment.useCdn
    });
  }

  getCategories(client: any) {
    const query = '*[_type == "category"]'

    return client.fetch(query);
  }

}
