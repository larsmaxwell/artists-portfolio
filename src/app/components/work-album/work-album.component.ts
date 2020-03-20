import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../types/album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { Work } from '../../types/work';

@Component({
  selector: 'app-work-album',
  templateUrl: './work-album.component.html',
  styleUrls: ['./work-album.component.css']
})
export class WorkAlbumComponent implements OnInit {

  @Input() albumId: string;
  @Input() work: Work;
  album: Album;

  constructor(
    private albumService: ArtWorkAlbumService
  ) { }

  ngOnInit() {
    this.getAlbum(this.albumId);
  }

  getAlbum(albumId: string) {
    this.albumService.getAlbumById(albumId)
      .subscribe(result => this.album = result);
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
