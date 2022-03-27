import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() mainMenuData: {};
  @Input() socialMenuData: {};

  public isCollapsed: boolean;
  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
  faBars = faBars;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    library: FaIconLibrary) {
    this.isCollapsed = false;
  }

  ngOnInit() {

    this.router.events.subscribe((val) => this.isCollapsed = false)

  }
}
