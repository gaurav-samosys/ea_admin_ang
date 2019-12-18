import { TestBed } from '@angular/core/testing';

import { Version3Service } from './version3.service';

describe('Version3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Version3Service = TestBed.get(Version3Service);
    expect(service).toBeTruthy();
  });
});
