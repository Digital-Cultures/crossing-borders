import { TestBed, inject } from '@angular/core/testing';

import { UidataService } from './uidata.service';

describe('UidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UidataService]
    });
  });

  it('should be created', inject([UidataService], (service: UidataService) => {
    expect(service).toBeTruthy();
  }));
});
