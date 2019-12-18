import { TestBed } from '@angular/core/testing';

import { ViewdetailService } from './viewdetail.service';

describe('ViewdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewdetailService = TestBed.get(ViewdetailService);
    expect(service).toBeTruthy();
  });
});
