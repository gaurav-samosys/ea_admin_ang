import { TestBed } from '@angular/core/testing';

import { AddclientService } from './addclient.service';

describe('AddclientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddclientService = TestBed.get(AddclientService);
    expect(service).toBeTruthy();
  });
});
