import { TestBed } from '@angular/core/testing';

import { SpinnersService } from './spinners.service';

describe('SpinnersService', () => {
  let service: SpinnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
