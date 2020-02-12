import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfirmboxComponent } from './user-confirmbox.component';

describe('UserConfirmboxComponent', () => {
  let component: UserConfirmboxComponent;
  let fixture: ComponentFixture<UserConfirmboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfirmboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfirmboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
