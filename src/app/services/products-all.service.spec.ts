import { TestBed } from '@angular/core/testing';

import { ProductsAllService } from './products-all.service';

describe('ProductsAllService', () => {
  let service: ProductsAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
