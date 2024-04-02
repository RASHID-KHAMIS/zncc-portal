import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberInfoComponent } from './view-member-info.component';

describe('ViewMemberInfoComponent', () => {
  let component: ViewMemberInfoComponent;
  let fixture: ComponentFixture<ViewMemberInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMemberInfoComponent]
    });
    fixture = TestBed.createComponent(ViewMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
