// Angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(
    private route: ActivatedRoute,
    private artWorkService: ArtWorkService,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const permalink = this.route.snapshot.paramMap.get('permalink');
    this.getArtWorkByPermalink(permalink);
    console.log(this);
  }

  getArtWorkByPermalink(permalink: string) {
    this.artWorkService.getWorkByPermalink(permalink).subscribe(artwork => this.work = artwork);
  }

}
