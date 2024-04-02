import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShehiaComponent } from './shehia.component';

describe('ShehiaComponent', () => {
  let component: ShehiaComponent;
  let fixture: ComponentFixture<ShehiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShehiaComponent]
    });
    fixture = TestBed.createComponent(ShehiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
