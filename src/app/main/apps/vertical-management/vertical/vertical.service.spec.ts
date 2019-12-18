import { TestBed } from '@angular/core/testing';

import { VerticalService } from './vertical.service';

describe('VerticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerticalService = TestBed.get(VerticalService);
    expect(service).toBeTruthy();
  });
});
