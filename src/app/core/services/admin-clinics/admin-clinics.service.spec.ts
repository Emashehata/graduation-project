import { TestBed } from '@angular/core/testing';

import { AdminClinicsService } from './admin-clinics.service';

describe('AdminClinicsService', () => {
  let service: AdminClinicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminClinicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
