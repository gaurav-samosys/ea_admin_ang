import { TestBed } from '@angular/core/testing';

import { VerticalManageService } from './vertical-manage.service';

describe('VerticalManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerticalManageService = TestBed.get(VerticalManageService);
    expect(service).toBeTruthy();
  });
});
