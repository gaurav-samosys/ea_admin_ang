import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrefreshComponent } from './editrefresh.component';

describe('EditrefreshComponent', () => {
  let component: EditrefreshComponent;
  let fixture: ComponentFixture<EditrefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
