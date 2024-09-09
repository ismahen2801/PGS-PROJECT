import { TestBed } from '@angular/core/testing';

import { OrderQuantityService } from './order-quantity.service';

describe('OrderQuantityService', () => {
  let service: OrderQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
