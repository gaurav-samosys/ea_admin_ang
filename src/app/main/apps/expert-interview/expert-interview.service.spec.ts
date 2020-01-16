import { TestBed } from '@angular/core/testing';

import { ExpertInterviewService } from './expert-interview.service';

describe('ExpertInterviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpertInterviewService = TestBed.get(ExpertInterviewService);
    expect(service).toBeTruthy();
  });
});
