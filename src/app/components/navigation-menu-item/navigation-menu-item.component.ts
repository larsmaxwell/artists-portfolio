import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation-menu-item',
  templateUrl: './navigation-menu-item.component.html',
})
export class NavigationMenuItem implements OnInit {

  @Input() item: any;

  icons = {
    'faEnvelope': faEnvelope,
    'faInstagram': faInstagram
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  mapToIcons(matchKey) {
    const keys = Object.keys(this.icons);
    const getKey = keys.find(key => key === matchKey);

    if (getKey) {
      return this.icons[getKey];
    }
    return null;
  }

}
