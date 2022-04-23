import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() mainMenuData: any; // add types for menu
  @Input() socialMenuData: any;

  public menuItems: [];
  isBrowser: boolean;
  public isCollapsed: boolean;
  resizeObservable$: Observable<any>;
  resizeSubscription$: Subscription;

  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
  faBars = faBars;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    library: FaIconLibrary,
    @Inject(PLATFORM_ID) private platformId
    ) {
    this.isCollapsed = false;
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isMobileSize()) this.isCollapsed = true;

    this.router.events.subscribe((val) => this.isCollapsed = false);

    if (this.isBrowser) {
      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
        if (!this.isMobileSize()) {
          this.isCollapsed = false;
        }
      });
    }

    this.menuItems = this.mainMenuData.items.map((item) => this.transformMenuItems(item));
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

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 576;
    }
  }

}
