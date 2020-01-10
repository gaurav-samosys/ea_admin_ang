import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalManageComponent } from './vertical-manage.component';

describe('VerticalManageComponent', () => {
  let component: VerticalManageComponent;
  let fixture: ComponentFixture<VerticalManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
