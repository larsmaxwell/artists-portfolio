import { TestBed, inject } from '@angular/core/testing';

import { ArtWorkService } from './art-work-service.service';

describe('ArtWorkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtWorkService]
    });
  });

  it('should be created', inject([ArtWorkService], (service: ArtWorkService) => {
    expect(service).toBeTruthy();
  }));
});
