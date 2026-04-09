import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { initialRedirectGuard } from './initial-redirect-guard';

describe('initialRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => initialRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
