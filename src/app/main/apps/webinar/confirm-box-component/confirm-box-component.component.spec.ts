import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBoxComponentComponent } from './confirm-box-component.component';

describe('ConfirmBoxComponentComponent', () => {
  let component: ConfirmBoxComponentComponent;
  let fixture: ComponentFixture<ConfirmBoxComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBoxComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
