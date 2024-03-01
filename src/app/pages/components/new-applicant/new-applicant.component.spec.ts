import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicantComponent } from './new-applicant.component';

describe('NewApplicantComponent', () => {
  let component: NewApplicantComponent;
  let fixture: ComponentFixture<NewApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewApplicantComponent]
    });
    fixture = TestBed.createComponent(NewApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
