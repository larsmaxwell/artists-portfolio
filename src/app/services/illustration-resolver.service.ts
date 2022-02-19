import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Illustration } from '../models/illustration.model';

import { SanityService } from './sanity.service';

@Injectable({
  providedIn: 'root'
})
export class IllustrationResolverService implements Resolve<Illustration[]> {

  constructor(private sanityService: SanityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<Illustration[]> | Promise<Illustration[]> | Illustration[] {
      return this.sanityService.getIllustrationAssets();
    }
}
