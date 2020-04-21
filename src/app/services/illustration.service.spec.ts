import { TestBed } from '@angular/core/testing';

import { IllustrationService } from './illustration.service';

describe('IllustrationService', () => {
  let service: IllustrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IllustrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
