import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Work } from '../work';
import { WorkService } from '../work.service';
import { WorksComponent } from '../works/works.component';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css'],
  providers: [WorkService]
})
export class WorkDetailComponent {
  work: Work;
  
  constructor(
    private route: ActivatedRoute,
    private workService: WorkService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWork();

  }

  getWork(): void {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.workService.getByPermalink(permalink)
      .subscribe(work => this.work = work[0]);
  }

}
