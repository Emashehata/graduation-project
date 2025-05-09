import { TestBed } from '@angular/core/testing';

import { AdminPatientsService } from './admin-patients.service';

describe('AdminPatientsService', () => {
  let service: AdminPatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
