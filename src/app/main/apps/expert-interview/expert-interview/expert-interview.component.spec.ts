import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInterviewComponent } from './expert-interview.component';

describe('ExpertInterviewComponent', () => {
  let component: ExpertInterviewComponent;
  let fixture: ComponentFixture<ExpertInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
