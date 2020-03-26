import { Component, OnInit, Input } from '@angular/core';
import { Album } from "../../../types/art-work-album"
import { ArtWorkAlbumService } from "../../../services/art-work-album.service";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  @Input() albumId: String;
  album: Album;

  constructor(
    private artWorkAlbumService: ArtWorkAlbumService 
  ) { }

  ngOnInit() {

    this.getAlbum(this.albumId)
    console.log(this)

  }

  getAlbum(id: String) {
    this.artWorkAlbumService.getAlbumById(id)
      .subscribe(album => this.album = album);
  }
}
