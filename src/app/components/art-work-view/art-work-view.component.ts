
// Angular
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import * as blocksToHtml from '@sanity/block-content-to-html';


// App Specific
import { ArtWork } from '../../types/art-work';
import { ArtWorkService } from '../../services/art-work-service.service';

@Component({
  selector: 'app-art-work-view',
  templateUrl: './art-work-view.component.html',
  styleUrls: ['./art-work-view.component.css']
})
export class ArtWorkViewComponent implements OnInit {

  work: ArtWork;
  albumId2: string;
  descriptionHtmlBlock: String; 

  constructor(
    private route: ActivatedRoute,
    private artWorkService: ArtWorkService,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);

    this.route.params.subscribe(routeParams => {
      this.getArtWorkByPermalink(routeParams.permalink);
    });
  }

  ngOnChange() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);
  }

  getArtWorkByPermalink(permalink: string) {
    this.artWorkService.getWorkByPermalink(permalink).subscribe(
      data => {
        this.work = data;
        if (data.album) this.albumId2 = data.album._ref;

        this.descriptionHtmlBlock = blocksToHtml({
          blocks: data.description,
        });
      });  }

}
