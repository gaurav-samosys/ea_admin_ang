import { TestBed } from '@angular/core/testing';

import { ManagecolorService } from './managecolor.service';

describe('ManagecolorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagecolorService = TestBed.get(ManagecolorService);
    expect(service).toBeTruthy();
  });
});
