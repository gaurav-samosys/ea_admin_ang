import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddverticalComponent } from './addvertical.component';

describe('AddverticalComponent', () => {
  let component: AddverticalComponent;
  let fixture: ComponentFixture<AddverticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddverticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
