import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Injectable()

export class FontAwesomeIconsService {

  icons = {
    'faEnvelope': faEnvelope,
    'faInstagram': faInstagram,
    'faBars': faBars
  }

  constructor(
    library: FaIconLibrary,
  ) {

  }

  getIcon = (iconName) => {
    if (this.icons[iconName]) return this.icons[iconName];

    return null;
  }

}