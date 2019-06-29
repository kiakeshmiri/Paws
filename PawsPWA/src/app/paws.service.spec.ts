import { TestBed } from '@angular/core/testing';

import { PawsService } from './paws.service';

describe('PawsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PawsService = TestBed.get(PawsService);
    expect(service).toBeTruthy();
  });
});
