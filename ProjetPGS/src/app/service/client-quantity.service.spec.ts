import { TestBed } from '@angular/core/testing';

import { ClientQuantityService } from './client-quantity.service';

describe('ClientQuantityService', () => {
  let service: ClientQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
