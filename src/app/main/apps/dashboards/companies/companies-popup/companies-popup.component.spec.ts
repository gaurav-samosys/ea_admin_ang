import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesPopupComponent } from './companies-popup.component';

describe('CompaniesPopupComponent', () => {
  let component: CompaniesPopupComponent;
  let fixture: ComponentFixture<CompaniesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
