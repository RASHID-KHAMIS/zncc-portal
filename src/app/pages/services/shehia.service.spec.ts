import { TestBed } from '@angular/core/testing';

import { ShehiaService } from './shehia.service';

describe('ShehiaService', () => {
  let service: ShehiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShehiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
