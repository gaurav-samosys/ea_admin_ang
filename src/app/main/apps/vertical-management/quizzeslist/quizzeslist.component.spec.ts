import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzeslistComponent } from './quizzeslist.component';

describe('QuizzeslistComponent', () => {
  let component: QuizzeslistComponent;
  let fixture: ComponentFixture<QuizzeslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzeslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
