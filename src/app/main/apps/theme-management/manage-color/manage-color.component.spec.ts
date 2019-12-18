import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColorComponent } from './manage-color.component';

describe('ManageColorComponent', () => {
  let component: ManageColorComponent;
  let fixture: ComponentFixture<ManageColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
