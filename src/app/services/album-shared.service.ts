import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SanityService } from './sanity.service';

@Injectable()
export class AlbumSharedService {
  albumIdChanged = new Subject<any>();
  imagesChanged = new Subject<any[] | null>();
  images: any[];

  constructor(
    private sanityService: SanityService
  ) { }

  updateAlbumId(id) {
    this.albumIdChanged.next(id);
    if (!id) {
      this.images = [];
      this.imagesChanged.next(null);
    }
    this.sanityService.getAlbumImages(id).subscribe(data => {
      // console.log(this.images);
      this.images = data;
      this.imagesChanged.next(data)
    });
  }

}
