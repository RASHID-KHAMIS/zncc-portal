import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffInfoComponent } from './view-staff-info.component';

describe('ViewStaffInfoComponent', () => {
  let component: ViewStaffInfoComponent;
  let fixture: ComponentFixture<ViewStaffInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStaffInfoComponent]
    });
    fixture = TestBed.createComponent(ViewStaffInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
