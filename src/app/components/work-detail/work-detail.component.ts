// Angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import * as blocksToHtml from '@sanity/block-content-to-html';


// App Specific
import { Work } from '../../types/work';
import { WorkService } from '../../services/work.service';
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
    private blockzToHtml: Subscription
  ) {

    console.log("hello", this.blockzToHtml);

  }

  loadPortableText(htmlStr: string):void  {
    const blockzToHtml = "hello";

    const hello = "heeloo!";
  }

  ngOnInit(): void {

    console.log(this.loadPortableText("json"));

    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getWork(permalink);
  }

  getWork(permalink: string): void {
    this.workService.getWorkByPermalink(permalink)
      .subscribe(data => {
        this.work = data[0];
        console.log(data);
        this.trustedUrl = this.work[0].mediaUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.work[0].mediaUrl) : undefined;

        
        
      } );
  }

}
