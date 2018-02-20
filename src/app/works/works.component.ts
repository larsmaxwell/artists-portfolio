import { Component, OnInit } from '@angular/core';

import { Work } from '../work';
import { WorkService } from '../work.service'
import { WorkDetailComponent } from '../work-detail/work-detail.component'

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  works: Work[];
  // selectedWork: Work;
  zineWorks: Work[];
  videoWorks: Work[];
  interactiveWorks: Work[];

  constructor(
    private workService: WorkService
  ) { }

  ngOnInit() {
    this.getWorksZine();
    this.getWorksVideo();
    this.getWorksInteractive();
  }

  getWorks(): void {
    this.workService.getWorks()
      .subscribe(works => this.works = works);
  }

  getWorksZine(): void {
    this.workService.getWorksByType('zine')
      .subscribe(zineWorks => this.zineWorks = zineWorks.slice().reverse());
  }

  getWorksVideo(): void {
    this.workService.getWorksByType('video')
      .subscribe(videoWorks => this.videoWorks = videoWorks.slice().reverse());
  }

  getWorksInteractive(): void {
    this.workService.getWorksByType('interactive')
      .subscribe(interactiveWorks => this.interactiveWorks = interactiveWorks.slice().reverse());
  }

}
