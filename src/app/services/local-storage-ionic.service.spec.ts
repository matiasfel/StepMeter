import { TestBed } from '@angular/core/testing';

import { LocalStorageIonicService } from './local-storage-ionic.service';

describe('LocalStorageIonicService', () => {
  let service: LocalStorageIonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageIonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
