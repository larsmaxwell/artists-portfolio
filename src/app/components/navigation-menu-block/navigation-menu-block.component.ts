import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-menu-block',
  templateUrl: './navigation-menu-block.component.html',
})
export class NavigationMenuBlockComponent implements OnInit {

  @Input() items: any;

  constructor() { }

  ngOnInit(): void {
  }
}
