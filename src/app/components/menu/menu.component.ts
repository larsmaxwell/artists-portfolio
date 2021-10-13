import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isCollapsed: boolean;
  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
  faBars = faBars;

  constructor(private route: ActivatedRoute, router: Router, library: FaIconLibrary) { 
    this.isCollapsed = false;

    router.events.subscribe((val) => this.isCollapsed = false)
  }

  ngOnInit() {}
}
