import { Component, OnInit } from '@angular/core';

import { Work } from '../../types/work';
import { WorkService } from '../../services/work.service'
import { WorkDetailComponent } from '../work-detail/work-detail.component'

import { GetByTypePipe } from '../../pipes/get-by-type.pipe'

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  works: Work[];

  constructor(
    private workService: WorkService
  ) { }

  ngOnInit() {
    // this.getWorks();
  }

  // getWorks(): void {
  //   this.workService.getWorks()
  //     .subscribe(works => this.works = works);
  // }
}
