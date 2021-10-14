import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SanityService } from './sanity.service';

@Injectable()
export class AlbumSharedService {
  imagesChanged = new Subject<any[] | null>();
  images: any[];

  constructor(
    private sanityService: SanityService
  ) { }

  updateAlbumId(id) {
    this.images = [];
    if (!id) {
      this.imagesChanged.next(null);
    }
    else {
      this.sanityService.getAlbumImages(id).subscribe(data => {
        // console.log(this.images);
        this.images = data;
        this.imagesChanged.next(data)
      });
    }
  }

}
