import { TestBed } from '@angular/core/testing';

import { AlbumSharedService } from './album-shared.service';

describe('AlbumSharedService', () => {
  let service: AlbumSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
