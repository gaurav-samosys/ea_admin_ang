import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditverticalComponent } from './editvertical.component';

describe('EditverticalComponent', () => {
  let component: EditverticalComponent;
  let fixture: ComponentFixture<EditverticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditverticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
