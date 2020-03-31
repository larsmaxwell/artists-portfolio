
// Angular
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, isPlatformServer } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';

import * as blocksToHtml from '@sanity/block-content-to-html';

// App Specific
import { ArtWork } from '../../types/art-work';
import { ArtWorkService } from '../../services/art-work-service.service';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';

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
    private albumService: ArtWorkAlbumService,
    private location: Location,
    private _sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
  }

  setMeta( newItems: {title:string, description: string, keywords: string}) {
    this.title.setTitle( newItems.title );
    this.meta.updateTag({name: 'description', content: newItems.description});
    this.meta.updateTag({name: 'keywords', content: newItems.description});
  }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);

    this.title.setTitle( "ngOnInit" );

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

    this.artWorkService.getWorkByPermalink(permalink).subscribe(
      data => {
        var metaData;
        this.work = data;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(data.mediaUrl);

        if (data.album) {
          this.albumId2 = data.album._ref;
        }
        else {
          this.albumId2 = null;
        }

        if (data.description) {
          this.descriptionHtmlBlock = blocksToHtml({
            blocks: data.description,
          });
        }
        this.title.setTitle( "subscribe2" );
        
        metaData = {title: data.name, description: data.name, keywords: data.name}
        this.setMeta(metaData);
      });
    }
}
