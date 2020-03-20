
// Angular
import { Component, OnInit, Input } from '@angular/core';
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
  albumId: number;
  descriptionHtmlBlock: String; 

  constructor(
    private route: ActivatedRoute,
    private artWorkService: ArtWorkService,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {
    // blocksToHtml({
    //   blocks: article.body,
    //   serializers: serializers
    // })
   // [ { "_key": "4773f2f48eb5", "_type": "block", "children": [ { "_key": "4773f2f48eb50", "_type": "span", "marks": [ "strong" ], "text": "heres some text!!!" } ], "markDefs": [], "style": "normal" } ]
  
  }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);
    console.log(this);
  }

  getArtWorkByPermalink(permalink: string) {
    this.artWorkService.getWorkByPermalink(permalink).subscribe(
      data => {
        this.work = data;
        this.descriptionHtmlBlock = blocksToHtml({
          blocks: data.description,
        });
      });
      //artwork => this.work = artwork);
  }

}
