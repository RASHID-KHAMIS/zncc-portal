import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInformationComponent } from './staff-information.component';

describe('StaffInformationComponent', () => {
  let component: StaffInformationComponent;
  let fixture: ComponentFixture<StaffInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInformationComponent]
    });
    fixture = TestBed.createComponent(StaffInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
