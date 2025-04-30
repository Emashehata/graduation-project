import { TestBed } from '@angular/core/testing';

import { HomeAdminService } from './home-admin.service';

describe('HomeAdminService', () => {
  let service: HomeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
