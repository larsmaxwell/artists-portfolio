import { Component, OnInit } from '@angular/core';
import { Work } from '../../types/work';
import { WorkService } from '../../services/work.service';
import { WorksComponent } from '../works/works.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
