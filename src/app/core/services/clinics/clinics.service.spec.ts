import { TestBed } from '@angular/core/testing';

import { ClinicsService } from './clinics.service';

describe('ClinicsService', () => {
  let service: ClinicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
