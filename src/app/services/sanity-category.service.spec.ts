import { TestBed, inject } from '@angular/core/testing';

import { SanityCategoryService } from './sanity-category.service';

describe('SanityCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanityCategoryService]
    });
  });

  it('should be created', inject([SanityCategoryService], (service: SanityCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
