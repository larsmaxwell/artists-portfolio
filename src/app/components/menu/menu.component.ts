import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isCollapsed: boolean;

  constructor(private route: ActivatedRoute, router: Router) { 
    this.isCollapsed = false;

    router.events.subscribe((val) => this.isCollapsed = false)
  }

  ngOnInit() {}
}
