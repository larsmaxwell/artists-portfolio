import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SanityService } from '../../services/sanity.service';
import { ArtWork } from '../../types/art-work';
import * as Isotope from 'isotope-layout';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work-album',
  templateUrl: './work-album.component.html',
  styleUrls: ['./work-album.component.css']
})
export class WorkAlbumComponent implements OnInit {

  @Input() albumId: string;
  @Input() galleryview: boolean;
  @Input() hideat: number;
  imgUrl: String;
  album: Album;
  sanityClient: any;
  sanityInstance: any;
  sanityImgBuilder: any;
  faExternalLinkSquareAlt = faExternalLinkSquareAlt;
  images: any;
  localStorage = localStorage; 

  constructor(
    private albumService: ArtWorkAlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private sanityService: SanityService,
    library: FaIconLibrary
  ) {

    library.addIcons(this.faExternalLinkSquareAlt);
    this.getSanity();
    this.getSanityUrlBuilder();
  }

  ngOnInit() {

    // this.getAlbum(this.albumId);
    this.getAlbumImages(this.albumId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.albumId.currentValue !== 'undefined') {
      // insert the new value
      this.getAlbumImages(changes.albumId.currentValue);
    }
    else {
      this.getAlbumImages(null);
    }
  }

  getAlbumImages(id) {
    this.albumService.getAlbumImages(this.sanityInstance, id).subscribe(data => {
      this.images = data;
    });
  }

  getSanity() {
    this.sanityInstance = this.sanityService.init();
  }

  getSanityUrlBuilder() {
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder(this.sanityInstance);
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }

  isMobileSize() {
    return window.innerWidth <= 575;
  }

}
