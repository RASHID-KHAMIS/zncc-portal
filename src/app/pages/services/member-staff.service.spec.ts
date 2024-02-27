import { TestBed } from '@angular/core/testing';

import { MemberStaffService } from './member-staff.service';

describe('MemberStaffService', () => {
  let service: MemberStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
