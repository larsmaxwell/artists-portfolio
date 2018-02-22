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
    this.getWorks()
    // this.getWorksZine();
    // this.getWorksVideo();
    // this.getWorksInteractive();
    console.log(window);
  }

  getWorks(): void {
    this.workService.getWorks()
      .subscribe(works => {
        this.zineWorks = works.filter(works => works.type === "zine").slice().reverse(),
        this.videoWorks = works.filter(works => works.type === "video").slice().reverse(),
        this.interactiveWorks = works.filter(works => works.type === "interactive").slice().reverse()
      });
  }
}
