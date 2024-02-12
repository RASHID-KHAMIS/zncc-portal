import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInformationComponent } from './member-information.component';

describe('MemberInformationComponent', () => {
  let component: MemberInformationComponent;
  let fixture: ComponentFixture<MemberInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberInformationComponent]
    });
    fixture = TestBed.createComponent(MemberInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
