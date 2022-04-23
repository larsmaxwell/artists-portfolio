import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { last, map, switchMap } from 'rxjs/operators';

import { SanityService } from './sanity.service';

@Injectable({
  providedIn: 'root'
})
export class SiteInfoResolverService implements Resolve<{}> {

  constructor(private sanityService: SanityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<{}> | Promise<{}> | any {
      return this.sanityService.getSiteSettingsAndMenu().pipe(
        map(data => {
          let storeObj: {} = {};

          for (const key in data) {
            if (data[key]._type === "navigation") {
              storeObj[key] = data[key];
            }
          }

          for (const key in storeObj) {
            let tempItems = storeObj[key].items.map((item) => this.transformMenuItems(item));
            storeObj[key] = {...storeObj[key], items: tempItems};
          }
          return {...data, ...storeObj};
        }),
      );
  }

  transformMenuItems = (item:any) => {

    let linkData:{};
    const isInternalLink =
      (item?.navigationItemUrl?.internalLink && Object.keys(item?.navigationItemUrl?.internalLink).length > 0) || 0;
    const isRelative = item?.navigationItemUrl?.relativeUrl || 0;

    if (!!isInternalLink) {
      linkData = {
        routerInfo: [
          '/',
          this.getTypeSlug(item.navigationItemUrl.internalLink._type),
          item.navigationItemUrl.internalLink.permalink.current
        ]
      }
    } else if (!!isRelative) {
      linkData = {
        routerInfo: [
          '/',
          item.navigationItemUrl.relativeUrl
        ]
      }
    }

    if (item.childrenItems) {
      item.childrenItems = item.childrenItems.map(item => this.transformMenuItems(item))
    }
    return {...item, linkData}
  }

  getTypeSlug(type: string) {
    if (type === 'artwork' ) {
      return 'works'
    }
    return type;
  }
}
