import { TestBed } from '@angular/core/testing';

import { IllustrationResolverService } from './illustration-resolver.service';

describe('IllustrationResolverService', () => {
  let service: IllustrationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IllustrationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
