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
    if (this.album) {
      // insert the new value
      this.getAlbum(changes.albumId.currentValue);
    }
  }

  getAlbum(albumId: string) {
    this.sanityClient = this.albumService.sanityInit();

    this.albumService.sanityGetAlbumById(albumId, this.sanityClient)
      .then(result => {
        this.album = result[0];
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

  // isValidLink() {
  //   if (window.innerWidth < 525) {
  //     return false;
  //   }
  //   if (this.work.type !== 'zine') {
  //     return false;
  //   }
  //   return true;
  // }

}
