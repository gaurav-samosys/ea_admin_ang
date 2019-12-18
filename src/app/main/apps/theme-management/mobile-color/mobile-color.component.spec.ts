import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileColorComponent } from './mobile-color.component';

describe('MobileColorComponent', () => {
  let component: MobileColorComponent;
  let fixture: ComponentFixture<MobileColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
