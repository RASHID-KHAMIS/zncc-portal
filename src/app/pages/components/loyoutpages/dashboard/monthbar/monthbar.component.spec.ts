import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthbarComponent } from './monthbar.component';

describe('MonthbarComponent', () => {
  let component: MonthbarComponent;
  let fixture: ComponentFixture<MonthbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthbarComponent]
    });
    fixture = TestBed.createComponent(MonthbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
