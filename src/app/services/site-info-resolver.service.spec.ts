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

      const siteData = this.sanityService.getSiteSettings();
      const conditionalLogic = siteData.pipe(
        last(),
        switchMap(data => {
          return forkJoin(
            { 
              siteData, // 183.68ms
              mainNav: this.sanityService.getMenu(data.mainNav._ref), // 211.92ms
              socialNav: this.sanityService.getItemById(data.socialNav._ref) // 175.89
            }
          )
        }),
        map(
          (detailsOrNull) => {
            console.log(detailsOrNull);
            return detailsOrNull
          }
        )
      ) 
      return conditionalLogic;


    }
}
