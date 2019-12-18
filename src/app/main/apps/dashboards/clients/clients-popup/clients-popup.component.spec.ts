import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsPopupComponent } from './clients-popup.component';

describe('ClientsPopupComponent', () => {
  let component: ClientsPopupComponent;
  let fixture: ComponentFixture<ClientsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
