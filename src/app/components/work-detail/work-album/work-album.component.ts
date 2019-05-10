import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../../types/album';
import { AlbumService } from '../../../services/album.service';
import { Work } from '../../../types/work';

@Component({
  selector: 'app-work-album',
  templateUrl: './work-album.component.html',
  styleUrls: ['./work-album.component.css']
})
export class WorkAlbumComponent implements OnInit {

  @Input() work: Work;
  album: Album;

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.getAlbum(this.work);
  }

  getAlbum(work: Work) {
    this.albumService.getAlbumByWorkID(work.id)
      .subscribe(result => this.album = result);
  }

  isValidLink() {
    if (window.innerWidth < 525) {
      return false;
    }
    if (this.work.type !== 'zine') {
      return false;
    }
    return true;
  }

}
