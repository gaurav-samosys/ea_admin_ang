import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserClientComponent } from './add-user-client.component';

describe('AddUserClientComponent', () => {
  let component: AddUserClientComponent;
  let fixture: ComponentFixture<AddUserClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
