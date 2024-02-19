import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSizeComponent } from './business-size.component';

describe('BusinessSizeComponent', () => {
  let component: BusinessSizeComponent;
  let fixture: ComponentFixture<BusinessSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessSizeComponent]
    });
    fixture = TestBed.createComponent(BusinessSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
