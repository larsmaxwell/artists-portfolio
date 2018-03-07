// Angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

// App Specific
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
  trustedUrl: SafeUrl;
  albumId: number;

  constructor(
    private route: ActivatedRoute,
    private workService: WorkService,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.getWork();
  }

  getWork(): void {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.workService.getWorkByPermalink(permalink)
      .subscribe(work => {
        this.work = work[0];
        this.trustedUrl = work[0].mediaUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(work[0].mediaUrl) : undefined;
      } );
  }

}
