
// Angular
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  safeURL: SafeResourceUrl;
  descriptionHtmlBlock: String; 

  constructor(
    private route: ActivatedRoute,
    private artWorkService: ArtWorkService,
    private location: Location,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);

    this.route.params.subscribe(routeParams => {
      this.getArtWorkByPermalink(routeParams.permalink);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);
  }

  getArtWorkByPermalink(permalink: string) {
    const client = this.artWorkService.init();
    console.log(permalink);
    this.artWorkService.getWorkByPermalink(client, permalink).then(
      data => {
        this.work = data[0];
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(data[0].mediaUrl);

        if (data[0].album) {
          this.albumId2 = data[0].album._ref;
        }
        else {
          this.albumId2 = null;
        }

        if (data[0].description) {
          this.descriptionHtmlBlock = blocksToHtml({
            blocks: data[0].description,
          });
        }

      });
    }
}