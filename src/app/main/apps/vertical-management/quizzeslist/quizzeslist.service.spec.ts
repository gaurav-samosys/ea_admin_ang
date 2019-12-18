import { TestBed } from '@angular/core/testing';

import { QuizzeslistService } from './quizzeslist.service';

describe('QuizzeslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizzeslistService = TestBed.get(QuizzeslistService);
    expect(service).toBeTruthy();
  });
});
