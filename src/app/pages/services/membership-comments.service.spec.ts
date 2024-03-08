import { TestBed } from '@angular/core/testing';

import { MembershipCommentsService } from './membership-comments.service';

describe('MembershipCommentsService', () => {
  let service: MembershipCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
