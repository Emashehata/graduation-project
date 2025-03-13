import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminguardGuard } from './adminguard.guard';

describe('adminguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
