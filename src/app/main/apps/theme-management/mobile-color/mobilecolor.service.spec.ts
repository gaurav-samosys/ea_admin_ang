import { TestBed } from '@angular/core/testing';

import { MobilecolorService } from './mobilecolor.service';

describe('MobilecolorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobilecolorService = TestBed.get(MobilecolorService);
    expect(service).toBeTruthy();
  });
});
