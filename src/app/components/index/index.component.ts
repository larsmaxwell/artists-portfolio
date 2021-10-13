import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  faBed = faBed;

  constructor(
    private library: FaIconLibrary,
  ) {

  }

  ngOnInit() {
  }
}
