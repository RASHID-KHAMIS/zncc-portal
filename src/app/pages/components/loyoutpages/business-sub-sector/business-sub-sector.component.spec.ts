import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubSectorComponent } from './business-sub-sector.component';

describe('BusinessSubSectorComponent', () => {
  let component: BusinessSubSectorComponent;
  let fixture: ComponentFixture<BusinessSubSectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessSubSectorComponent]
    });
    fixture = TestBed.createComponent(BusinessSubSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
