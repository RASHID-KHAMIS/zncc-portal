import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPositionComponent } from './staff-position.component';

describe('StaffPositionComponent', () => {
  let component: StaffPositionComponent;
  let fixture: ComponentFixture<StaffPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPositionComponent]
    });
    fixture = TestBed.createComponent(StaffPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
