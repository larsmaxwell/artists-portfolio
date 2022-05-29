import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIconsService } from '../../services/font-awesome-icons.service';

@Component({
  selector: 'app-navigation-menu-item',
  templateUrl: './navigation-menu-item.component.html',
})
export class NavigationMenuItem implements OnInit {

  @Input() item: any;
  
  constructor(
    public fontAwesomeIcons: FontAwesomeIconsService
  ) { }

  ngOnInit(): void {
  }

}
