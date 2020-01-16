import { TestBed } from '@angular/core/testing';

import { WebinarListService } from './webinar-list.service';

describe('WebinarListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebinarListService = TestBed.get(WebinarListService);
    expect(service).toBeTruthy();
  });
});
