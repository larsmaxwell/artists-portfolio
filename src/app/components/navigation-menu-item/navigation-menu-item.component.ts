import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-menu-item',
  templateUrl: './navigation-menu-item.component.html',
})
export class NavigationMenuItem implements OnInit {

  @Input() item: any;
  
  constructor() { }

  ngOnInit(): void {
  }
}
