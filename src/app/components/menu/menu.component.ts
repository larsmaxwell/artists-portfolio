import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { FontAwesomeIconsService } from '../../services/font-awesome-icons.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() mainMenuData: any; // add types for menu
  @Input() socialMenuData: any;

  public menuItems: [];
  public socialMenuItems: [];
  isBrowser: boolean;
  public isCollapsed: boolean;
  resizeObservable$: Observable<any>;
  resizeSubscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fontAwesomeIcons: FontAwesomeIconsService,
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

    this.socialMenuItems = this.socialMenuData.items;
    this.menuItems = this.mainMenuData.items;
  }

  isMobileSize() {
    if (this.isBrowser) {
      return window.innerWidth <= 576;
    }
  }
}
