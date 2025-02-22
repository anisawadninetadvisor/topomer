import { TestBed } from '@angular/core/testing';

import { PaimentsService } from './paiments.service';

describe('PaimentsService', () => {
  let service: PaimentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaimentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
