import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navigation-menu-block',
  templateUrl: './navigation-menu-block.component.html',
})
export class NavigationMenuBlockComponent implements OnInit {

  @Input() items: any;
  @Input() iteration: number = 0;
  @Input() classNames: [] = [];

  ulClassNames: string[];
  liClassNames: string[];

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.ulClassNames = 
      [...(this?.classNames?.[this.iteration]?.ul || []), `navigation-level-${this.iteration}`];
    this.liClassNames = [...(this?.classNames?.[this.iteration]?.li || []), `navigation-level-${this.iteration}--item`];
  }

}
