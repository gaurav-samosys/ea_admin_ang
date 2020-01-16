import { TestBed } from '@angular/core/testing';

import { AddWebinarService } from './add-webinar.service';

describe('AddWebinarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddWebinarService = TestBed.get(AddWebinarService);
    expect(service).toBeTruthy();
  });
});
