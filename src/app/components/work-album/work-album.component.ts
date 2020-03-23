import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../types/album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { Work } from '../../types/work';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-work-album',
  templateUrl: './work-album.component.html',
  styleUrls: ['./work-album.component.css']
})
export class WorkAlbumComponent implements OnInit {

  @Input() albumId: string;
  @Input() work: Work;
  @Input() album: Album;
  imgUrl: String;
  sanityInstance: any;
  sanityImgBuilder: any;

  constructor(
    private albumService: ArtWorkAlbumService,
    private sanityService: SanityService,
  ) { }

  ngOnInit() {
    this.getSanity();
    this.getSanityUrlBuilder();
    this.getAlbum(this.albumId);
    console.log(this.work)
  }

  getAlbum(albumId: string) {
    this.albumService.getAlbumById(albumId)
      .subscribe(result => {
        this.album = result;
        console.log(this.album);
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
