import { TestBed } from '@angular/core/testing';

import { AddVerticalService } from './add-vertical.service';

describe('AddVerticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddVerticalService = TestBed.get(AddVerticalService);
    expect(service).toBeTruthy();
  });
});
