import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDialogComponentComponent } from './picture-dialog-component.component';

describe('PictureDialogComponentComponent', () => {
  let component: PictureDialogComponentComponent;
  let fixture: ComponentFixture<PictureDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureDialogComponentComponent]
    });
    fixture = TestBed.createComponent(PictureDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
