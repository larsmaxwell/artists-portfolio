import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SanityService } from '../../services/sanity.service';
import { ArtWork } from '../../types/art-work';


@Component({
  selector: 'app-work-album',
  templateUrl: './work-album.component.html',
  styleUrls: ['./work-album.component.css']
})
export class WorkAlbumComponent implements OnInit {

  @Input() albumId: string;
  @Input() fullGalleryView: boolean;
  imgUrl: String;
  album: Album;
  sanityClient: any;
  sanityInstance: any;
  sanityImgBuilder: any;

  constructor(
    private albumService: ArtWorkAlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private sanityService: SanityService,
  ) { }

  ngOnInit() {
    this.getSanity();
    this.getSanityUrlBuilder();
    this.getAlbum(this.albumId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.albumId.currentValue !== 'undefined') {
      // insert the new value
      this.getAlbum(changes.albumId.currentValue);
    }
    else {
      this.getAlbum(null);
    }
  }

  getAlbum(albumId: any) {
    this.sanityClient = this.albumService.sanityInit();

    if (albumId) {
      this.albumService.sanityGetAlbumById(albumId, this.sanityClient)
      .then(result => {
        this.album = result[0];
      });
    }
    else {
      this.album = null;
    }

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
