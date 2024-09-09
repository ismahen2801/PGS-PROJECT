import { TestBed } from '@angular/core/testing';

import { LoyalService } from './loyal.service';

describe('LoyalService', () => {
  let service: LoyalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
