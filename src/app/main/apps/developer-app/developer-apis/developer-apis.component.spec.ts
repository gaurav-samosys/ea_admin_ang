import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperApisComponent } from './developer-apis.component';

describe('DeveloperApisComponent', () => {
  let component: DeveloperApisComponent;
  let fixture: ComponentFixture<DeveloperApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperApisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
