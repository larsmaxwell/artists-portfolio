import { TestBed } from '@angular/core/testing';

import { ShoppingServiceService } from './shopping-service.service';

describe('ShoppingServiceService', () => {
  let service: ShoppingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
