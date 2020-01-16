import { TestBed } from '@angular/core/testing';

import { AddInterviewService } from './add-interview.service';

describe('AddInterviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddInterviewService = TestBed.get(AddInterviewService);
    expect(service).toBeTruthy();
  });
});
