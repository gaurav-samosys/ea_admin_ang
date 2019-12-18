import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteverticalComponent } from './deletevertical.component';

describe('DeleteverticalComponent', () => {
  let component: DeleteverticalComponent;
  let fixture: ComponentFixture<DeleteverticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteverticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
