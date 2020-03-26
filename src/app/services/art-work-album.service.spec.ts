import { TestBed, inject } from '@angular/core/testing';

import { ArtWorkAlbumService } from './art-work-album.service';

describe('ArtWorkAlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtWorkAlbumService]
    });
  });

  it('should be created', inject([ArtWorkAlbumService], (service: ArtWorkAlbumService) => {
    expect(service).toBeTruthy();
  }));
});
