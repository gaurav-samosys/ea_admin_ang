import { TestBed } from '@angular/core/testing';

import { DeveloperapiService } from './developerapi.service';

describe('DeveloperapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeveloperapiService = TestBed.get(DeveloperapiService);
    expect(service).toBeTruthy();
  });
});
