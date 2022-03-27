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
      return this.sanityService.getSiteSettingsAndMenu();
  }
}
