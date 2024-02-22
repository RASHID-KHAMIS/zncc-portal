import { TestBed } from '@angular/core/testing';

import { CompanyOwnershipService } from './company-ownership.service';

describe('CompanyOwnershipService', () => {
  let service: CompanyOwnershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOwnershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
