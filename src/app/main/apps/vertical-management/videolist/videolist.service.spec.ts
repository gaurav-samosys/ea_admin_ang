import { TestBed } from '@angular/core/testing';

import { VideolistService } from './videolist.service';

describe('VideolistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideolistService = TestBed.get(VideolistService);
    expect(service).toBeTruthy();
  });
});
