import { TestBed } from '@angular/core/testing';

import { BusinessSubSectorService } from './business-sub-sector.service';

describe('BusinessSubSectorService', () => {
  let service: BusinessSubSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSubSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
