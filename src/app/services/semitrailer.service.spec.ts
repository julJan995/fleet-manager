import { TestBed } from '@angular/core/testing';

import { SemitrailerService } from './semitrailer.service';

describe('SemitrailerService', () => {
  let service: SemitrailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemitrailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
