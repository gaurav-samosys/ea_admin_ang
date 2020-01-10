import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVerticalComponent } from './add-vertical.component';

describe('AddVerticalComponent', () => {
  let component: AddVerticalComponent;
  let fixture: ComponentFixture<AddVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
