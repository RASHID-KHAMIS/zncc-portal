import { TestBed } from '@angular/core/testing';

import { MembershipUploadService } from './membership-upload.service';

describe('MembershipUploadService', () => {
  let service: MembershipUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
