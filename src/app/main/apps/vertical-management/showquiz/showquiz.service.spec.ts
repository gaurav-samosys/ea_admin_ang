import { TestBed } from '@angular/core/testing';

import { ShowquizService } from './showquiz.service';

describe('ShowquizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowquizService = TestBed.get(ShowquizService);
    expect(service).toBeTruthy();
  });
});
