import { TestBed } from '@angular/core/testing';

import { NetworkstatusService } from './networkstatus.service';

describe('NetworkstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkstatusService = TestBed.get(NetworkstatusService);
    expect(service).toBeTruthy();
  });
});
